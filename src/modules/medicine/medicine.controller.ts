import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { MedicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
  try {
    // console.log("Controller", req.user);
    console.log(req.body);
    const result = await MedicineService.createMedicineIntoDB(
      req.body,
      req.user?.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.getAllMedicinesIntoDB(req.user?.id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Pets retrived Successfully.",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getSingleMedicine = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.getSingleMedicineIntoDB(
      req.params?.id as string,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Pets retrived Successfully.",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

export const MedicineController = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
};
