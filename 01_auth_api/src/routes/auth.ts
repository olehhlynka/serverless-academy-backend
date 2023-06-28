import { Router } from "express";
import authController from "../controllers/authController";
import {
  validateUserCredentials,
  validateToken,
} from "../middlewares/middlewares";

const router: Router = Router();

router.post(
  "/sign-in",
  validateUserCredentials,
  authController.signIn
);
router.post(
  "/sign-up",
  validateUserCredentials,
  authController.signUp
);
router.post(
  "/refresh",
  validateToken,
  authController.refreshToken
);

export default router;
