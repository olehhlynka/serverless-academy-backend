import { Router } from "express";
import userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/middlewares";

const router: Router = Router();

router.use(authenticateToken);
router.get("/me", userController.getCurrentUser);

export default router;
