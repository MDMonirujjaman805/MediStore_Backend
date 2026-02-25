import express from "express";

import { MedicineController } from "./medicine.controller";
import auth from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", auth(), MedicineController.createMedicine);
router.get("/", MedicineController.getAllMedicines);
router.get("/:id", MedicineController.getSingleMedicine);

export const MedicineRoutes = router;
