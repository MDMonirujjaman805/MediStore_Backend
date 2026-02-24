import express from "express";

import { MedicineController } from "./medicine.controller";

const router = express.Router();

router.post("/", MedicineController.createMedicine);
router.get("/", MedicineController.getAllMedicines);
router.get("/:id", MedicineController.getSingleMedicine);

export const MedicineRoutes = router;


// router.post("/", auth(Role.CUSTOMER), MedicineController.createMedicine);
// router.get("/", auth(Role.CUSTOMER), MedicineController.getAllMedicines);
// router.get("/:id", auth(Role.CUSTOMER), MedicineController.getSingleMedicine);