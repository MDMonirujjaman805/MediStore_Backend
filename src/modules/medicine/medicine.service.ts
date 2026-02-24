import { prisma } from "../../lib/prisma";

const createMedicineIntoDB = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("Invalid user");
  }

  const result = await prisma.medicine.create({
    data: { ...payload, ownerId: userId },
  });
  return result;
};

const getAllMedicinesIntoDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found!!");
  }

  const result = await prisma.medicine.findMany({
    where: {
      sellerId: user.id,
    },
  });

  return result;
};

const getSingleMedicineIntoDB = async (petId: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id: petId,
    },
  });

  return result;
};

export const MedicineService = {
  createMedicineIntoDB,
  getAllMedicinesIntoDB,
  getSingleMedicineIntoDB,
};
