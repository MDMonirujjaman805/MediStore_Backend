import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Ensure JWT_SECRET exists
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

// Type-safe payloads based on Prisma schema
interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "CUSTOMER" | "SELLER" | "ADMIN";
}

interface LoginPayload {
  email: string;
  password: string;
}

const createUserIntoDB = async (payload: CreateUserPayload) => {
  // Validate required fields
  if (!payload.name || !payload.email || !payload.password) {
    throw new Error("Name, email, and password are required");
  }

  // Check duplicate email
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser) throw new Error("User with this email already exists");

  // Hash password
  const hashPassword = await bcrypt.hash(payload.password, 8);

  // Create user
  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword,
      role: payload.role || "CUSTOMER",
      status: "ACTIVE",
    },
  });

  const { password, ...newUser } = user;
  return newUser;
};

const loginUserIntoDB = async (payload: LoginPayload) => {
  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required");
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (!user) throw new Error("User not found!");

  // Compare passwords
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) throw new Error("Invalid credentials!");

  // Prepare user data for token
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  // Generate JWT
  const token = jwt.sign(userData, secret, { expiresIn: "1d" });

  return { token, user: userData };
};

export const AuthService = {
  createUserIntoDB,
  loginUserIntoDB,
};
