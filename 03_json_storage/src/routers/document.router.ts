import { Router } from "express";
import documentController from "../controllers/document.controller";
import { jsonErrorHandler } from "../middlewares/jsonErrorHandler.middleware";

const router = Router();

router.put(
  "/:path/:fileName",
  jsonErrorHandler,
  documentController.saveDocument
);

router.get(
  "/:path/:fileName",
  documentController.findDocument
);

export default router;
