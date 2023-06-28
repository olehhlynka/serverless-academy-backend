import {
  userSchema,
  refreshTokenSchema,
} from "../validations/validations";
import { ACCESS_TOKEN_SECRET } from "../config/constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const validateUserCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: `One or more fields are missing or invalid`,
    });
  }
  next();
};

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = refreshTokenSchema.validate(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: `Token field missing or invalid`,
    });
  }
  next();
};

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access token was not provided",
      });
    }
    const decodedUserInfo = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET
    ) as JwtPayload;
    req.userInfo = decodedUserInfo;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: "Invalid token",
    });
  }
};

export {
  validateUserCredentials,
  validateToken,
  authenticateToken,
};
