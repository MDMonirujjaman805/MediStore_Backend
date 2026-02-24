import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { MedicineRoutes } from "../modules/medicine/medicine.route";

const router = Router();

const routerManger = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/medicine",
    route: MedicineRoutes,
  },
  //   {
  //     path: "/sitter",
  //     route: SitterRoutes,
  //   },
  //   {
  //     path: "/service",
  //     route: ServiceRoutes,
  //   },
  //   {
  //     path: "/booking",
  //     route: BookingRoutes,
  //   },
];

routerManger.forEach((r) => router.use(r.path, r.route));

// console.log(MedicineRoutes);

export default router;
