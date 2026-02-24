import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.createUserIntoDB(req.body);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to create user",
      data: null,
    });
  }
};

// const loginUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await AuthService.loginUserIntoDB(req.body);

//     res.cookie("token", result.token, {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       sameSite: "strict",
//     });

//     return sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "User logged in successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     return sendResponse(res, {
//       statusCode: 401,
//       success: false,
//       message: error.message || "Invalid credentials",
//       data: null,
//     });
//   }
// };

// import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // 🎯 Token generate
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  res.json({
    success: true,
    token,
  });
};

export const AuthController = {
  createUser,
  loginUser,
};
