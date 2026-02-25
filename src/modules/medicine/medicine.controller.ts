// import { Request, Response } from "express";
// import sendResponse from "../../utils/sendResponse";
// import { MedicineService } from "./medicine.service";

// const createMedicine = async (req: Request, res: Response) => {
//   try {
//     const result = await MedicineService.createMedicineIntoDB(
//       req.body,
//       req.user?.id,
//     );

//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "Medicine created",
//       data: result,
//     });
//   } catch (error: any) {
//     sendResponse(res, {
//       statusCode: 400,
//       success: false,
//       message: error?.message || "Something went wrong!!",
//       data: null,
//     });
//   }
// };

// const getAllMedicines = async (req: Request, res: Response) => {
//   try {
//     const result = await MedicineService.getAllMedicinesIntoDB(req.user?.id);

//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "All Medicines Retrieved Successfully.",
//       data: result,
//     });
//   } catch (error: any) {
//     sendResponse(res, {
//       statusCode: 400,
//       success: false,
//       message: error?.message || "Something went wrong!!",
//       data: null,
//     });
//   }
// };

// const getSingleMedicine = async (req: Request, res: Response) => {
//   try {
//     const result = await MedicineService.getSingleMedicineIntoDB(
//       req.params?.id as string,
//     );

//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "Medicine Retrieved Successfully.",
//       data: result,
//     });
//   } catch (error: any) {
//     sendResponse(res, {
//       statusCode: 400,
//       success: false,
//       message: error?.message || "Something went wrong!!",
//       data: null,
//     });
//   }
// };

// export const MedicineController = {
//   createMedicine,
//   getAllMedicines,
//   getSingleMedicine,
// };

import { Request, Response } from "express";
import { MedicineService } from "./medicine.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { TJwtPayload } from "../../types/jwtPayload";

// Extend Request type for authenticated user
interface AuthRequest extends Request {
  user?: TJwtPayload;
}

const createMedicine = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const result = await MedicineService.createMedicineIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Medicine created successfully.",
    data: result,
  });
});

const getAllMedicines = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const result = await MedicineService.getAllMedicinesIntoDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicines retrieved successfully.",
    data: result,
  });
});

const getSingleMedicine = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await MedicineService.getSingleMedicineIntoDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine retrieved successfully.",
    data: result,
  });
});

export const MedicineController = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
};