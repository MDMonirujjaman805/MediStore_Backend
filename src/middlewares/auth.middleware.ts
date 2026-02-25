// import jwt from "jsonwebtoken";
// import httpStatus from "http-status";
// import AppError from "../types/common";
// import { Request, Response, NextFunction } from "express";

// export interface TJwtPayload {
//   id: string;
//   email: string;
//   role: string;
// }

// interface AuthRequest extends Request {
//   user?: TJwtPayload;
// }

// const auth = () => {
//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//       const token = req.headers.authorization;

//       if (!token) {
//         throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
//       }

//       const verifiedUser = jwt.verify(
//         token,
//         process.env.JWT_SECRET as string,
//       ) as TJwtPayload;

//       req.user = verifiedUser;

//       next();
//     } catch (error) {
//       next(new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token........"));
//     }
//   };
// };

// export default auth;

import { Request, Response, NextFunction } from "express";
import AppError from "../types/common";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

export interface TJwtPayload {
  id: string;
  email: string;
  role: string;
}

interface AuthRequest extends Request {
  user?: TJwtPayload;
}

const auth = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const token = authHeader.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in env");
      }

      const verifiedUser = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as TJwtPayload;

      req.user = verifiedUser;

      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return next(new AppError(httpStatus.UNAUTHORIZED, "Token expired"));
      }
      if (err.name === "JsonWebTokenError") {
        return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token"));
      }
      next(err);
    }
  };
};

export default auth;