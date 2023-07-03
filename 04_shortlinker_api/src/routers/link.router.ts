import { Router } from "express";
import { invalidBodyHandler } from "../middlewares/invalidBodyHandler.middleware";
import linkController from "../controllers/link.controller";

const router: Router = Router();

router.post(
  "/",
  invalidBodyHandler,
  linkController.addNewLink
);

router.get("/:path", linkController.followShortLink);

export default router;
