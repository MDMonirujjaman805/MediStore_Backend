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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    res.cookie("token", result.token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: error.message || "Invalid credentials",
      data: null,
    });
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
