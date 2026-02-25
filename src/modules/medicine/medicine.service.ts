// import { prisma } from "../../lib/prisma";

// const createMedicineIntoDB = async (payload: any, userId: string) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   if (!user) {
//     throw new Error("Invalid user");
//   }

//   const result = await prisma.medicine.create({
//     data: { ...payload, sellerId: userId },
//   });
//   return result;
// };

// const getAllMedicinesIntoDB = async (userId: string) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   if (!user) {
//     throw new Error("Medicine not found!!");
//   }

//   const result = await prisma.medicine.findMany({
//     where: {
//       sellerId: user.id,
//     },
//   });

//   return result;
// };

// const getSingleMedicineIntoDB = async (petId: string) => {
//   const result = await prisma.medicine.findUnique({
//     where: {
//       id: petId,
//     },
//   });

//   return result;
// };

// export const MedicineService = {
//   createMedicineIntoDB,
//   getAllMedicinesIntoDB,
//   getSingleMedicineIntoDB,
// };

// import { Medicine } from "../../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";
// // import { Medicine } from "@prisma/client";
// import httpStatus from "http-status";

// const createMedicineIntoDB = async (
//   payload: Partial<Medicine>,
//   userId: string,
// ) => {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!user) {
//     throw new Error("Invalid user.");
//   }

//   const result = await prisma.medicine.create({
//     data: {
//       ...payload,
//       sellerId: userId,
//     },
//   });

//   return result;
// };

// const getAllMedicinesIntoDB = async (userId: string) => {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!user) {
//     throw new Error("Invalid user.");
//   }

//   const result = await prisma.medicine.findMany({
//     where: {
//       sellerId: userId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return result;
// };

// const getSingleMedicineIntoDB = async (medicineId: string) => {
//   const result = await prisma.medicine.findUnique({
//     where: {
//       id: medicineId,
//     },
//   });

//   if (!result) {
//     throw new Error("Medicine not found.");
//   }

//   return result;
// };

// export const MedicineService = {
//   createMedicineIntoDB,
//   getAllMedicinesIntoDB,
//   getSingleMedicineIntoDB,
// };

import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../types/common";
import httpStatus from "http-status";

const createMedicineIntoDB = async (
  payload: Prisma.MedicineCreateInput,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await prisma.medicine.create({
    data: {
      ...payload,
      seller: {
        connect: { id: userId },
      },
    },
  });

  return result;
};

const getAllMedicinesIntoDB = async (userId: string) => {
  return prisma.medicine.findMany({
    where: { sellerId: userId },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleMedicineIntoDB = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: { id: medicineId },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Medicine not found");
  }

  return result;
};

export const MedicineService = {
  createMedicineIntoDB,
  getAllMedicinesIntoDB,
  getSingleMedicineIntoDB,
};