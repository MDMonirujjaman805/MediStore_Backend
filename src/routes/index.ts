import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { MedicineRoutes } from "../modules/medicine/medicine.route";

const router = Router();

// router.use("/auth", AuthRoutes);
// router.use("/medicine", MedicineRoutes);

const routerManger = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/medicine",
    route: MedicineRoutes,
  }
];

routerManger.forEach((r) => router.use(r.path, r.route));

console.log("MedicineRoutes:", MedicineRoutes);
export default router;
