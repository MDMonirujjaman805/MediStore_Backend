import { Request, Response, NextFunction } from "express";
import { TJwtPayload } from "../types/jwtPayload";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1️⃣ Token check
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TJwtPayload;

    // 3️⃣ Find user in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 4️⃣ Check user status
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "User is banned or inactive.",
      });
    }

    // 5️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
