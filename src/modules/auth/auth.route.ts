import express from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware2";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.loginUser);

// router.get("/profile", authMiddleware, async (req, res) => {
//   res.json({
//     success: true,
//     data: req.user,
//   });
// });

export const AuthRoutes = router;
