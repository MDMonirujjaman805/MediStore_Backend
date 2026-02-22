// // // import { prisma } from "../../lib/prisma";
// // // import jwt from "jsonwebtoken";
// // // import bcrypt from "bcryptjs"

// // // export const secret =
// // //   "f34d414435a7c8c63dcc7bc4bb9c738153f5951c0cf7353284266d6043ee665b";

// // // const createUserIntoDB = async (payload: any) => {
// // //   const hashPassword = await bcrypt.hash(payload.password, 8);

// // //   const result = await prisma.user.create({
// // //     data: { ...payload, password: hashPassword },
// // //   });
// // //   const { password, ...newResult } = result;
// // //   return newResult;
// // // };

// // // const loginUserIntoDB = async (payload: any) => {
// // //   const user = await prisma.user.findUnique({
// // //     where: {
// // //       email: payload.email,
// // //     },
// // //   });
// // //   if (!user) {
// // //     throw new Error("User not found!");
// // //   }

// // //   const isPasswordMatched = await bcrypt.compare(
// // //     payload.password,
// // //     user.password,
// // //   );

// // //   if (!isPasswordMatched) {
// // //     throw new Error("Invalid credentials!!");
// // //   }

// // //   const userData = {
// // //     id: user.id,
// // //     name: user.name,
// // //     role: user.role,
// // //     status: user.status,
// // //     email: user.email,
// // //   };

// // //   const token = jwt.sign(userData, secret, { expiresIn: "1d" });

// // //   return {
// // //     token,
// // //     user,
// // //   };
// // // };

// // // export const AuthService = {
// // //   createUserIntoDB,
// // //   loginUserIntoDB,
// // // };

// // import { prisma } from "../../lib/prisma";
// // import jwt from "jsonwebtoken";
// // import bcrypt from "bcryptjs";

// // export const secret =
// //   "f34d414435a7c8c63dcc7bc4bb9c738153f5951c0cf7353284266d6043ee665b";

// // // Strongly typed payloads
// // interface CreateUserPayload {
// //   name: string;
// //   email: string;
// //   password: string;
// //   role?: "USER" | "ADMIN";
// // }

// // interface LoginPayload {
// //   email: string;
// //   password: string;
// // }

// // const createUserIntoDB = async (payload: CreateUserPayload) => {
// //   if (!payload.password || !payload.email || !payload.name) {
// //     throw new Error("Name, email, and password are required");
// //   }

// //   // Check if user already exists
// //   const existingUser = await prisma.user.findUnique({
// //     where: { email: payload.email },
// //   });
// //   if (existingUser) {
// //     throw new Error("User with this email already exists");
// //   }

// //   const hashPassword = await bcrypt.hash(payload.password, 8);

// //   const userData = {
// //     ...payload,
// //     password: hashPassword,
// //     role: payload.role ?? "USER", // Default to "USER"
// //   };

// //   const result = await prisma.user.create({
// //     // data: { ...payload, password: hashPassword },
// //     data: userData,
// //   });

// //   const { password, ...newResult } = result;
// //   return newResult;
// // };

// // const loginUserIntoDB = async (payload: LoginPayload) => {
// //   if (!payload.email || !payload.password) {
// //     throw new Error("Email and password are required");
// //   }

// //   const user = await prisma.user.findUnique({
// //     where: { email: payload.email },
// //   });
// //   if (!user) throw new Error("User not found!");

// //   const isPasswordMatched = await bcrypt.compare(
// //     payload.password,
// //     user.password,
// //   );
// //   if (!isPasswordMatched) throw new Error("Invalid credentials!");

// //   const userData = {
// //     id: user.id,
// //     name: user.name,
// //     role: user.role,
// //     status: user.status,
// //     email: user.email,
// //   };

// //   const token = jwt.sign(userData, secret, { expiresIn: "1d" });

// //   return { token, user: userData };
// // };

// // export const AuthService = {
// //   createUserIntoDB,
// //   loginUserIntoDB,
// // };

// import { prisma } from "../../lib/prisma";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// // JWT secret
// const secret = process.env.JWT_SECRET;

// // Type-safe payloads based on your Prisma schema
// interface CreateUserPayload {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   role?: "CUSTOMER" | "SELLER" | "ADMIN"; // enum Role
// }

// interface LoginPayload {
//   email: string;
//   password: string;
// }

// const createUserIntoDB = async (payload: CreateUserPayload) => {
//   // Validate required fields
//   if (!payload.name || !payload.email || !payload.password) {
//     throw new Error("Name, email, and password are required");
//   }

//   // Check for duplicate email
//   const existingUser = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });
//   if (existingUser) {
//     throw new Error("User with this email already exists");
//   }

//   // Hash password
//   const hashPassword = await bcrypt.hash(payload.password, 8);

//   // Create user
//   const user = await prisma.user.create({
//     data: {
//       ...payload,
//       password: hashPassword,
//       role: payload.role || "CUSTOMER", // default role if not provided
//       status: "ACTIVE", // default status
//     },
//   });

//   const { password, ...newUser } = user;
//   return newUser;
// };

// const loginUserIntoDB = async (payload: LoginPayload) => {
//   if (!payload.email || !payload.password) {
//     throw new Error("Email and password are required");
//   }

//   // Find user by email
//   const user = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });
//   if (!user) throw new Error("User not found!");

//   // Compare passwords
//   const isPasswordMatched = await bcrypt.compare(
//     payload.password,
//     user.password,
//   );
//   if (!isPasswordMatched) throw new Error("Invalid credentials!");

//   // Prepare user data (without password)
//   const userData = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//     status: user.status,
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//   };

//   // Check valid jwt token
//   if (!secret) {
//     throw new Error("JWT_SECRET is not defined in .env file");
//   }

//   // Generate JWT token
//   const token = jwt.sign(userData, secret, { expiresIn: "1d" });

//   return { token, user: userData };
// };

// export const AuthService = {
//   createUserIntoDB,
//   loginUserIntoDB,
// };

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