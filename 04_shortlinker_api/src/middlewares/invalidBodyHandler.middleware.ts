import { Request, Response, NextFunction } from "express";
import { bodyScheema } from "../validators/bodyLink.validator";

export const invalidBodyHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = bodyScheema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      error: "Invalid or missing value for field: link",
    });
  }
  next();
};
