import { Router } from "express";
import documentController from "../controllers/document.controller";

const router = Router();

router.put("/:path/:fileName", documentController.create);

router.get("/:path/:fileName", documentController.find);

export default router;
