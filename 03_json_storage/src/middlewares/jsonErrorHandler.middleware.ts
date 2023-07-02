import { Request, Response, NextFunction } from "express";

const jsonErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError) {
    res.status(400).render("error", {
      message: "Bad Request",
      status: 400,
    });
  } else {
    next(err);
  }
};

export { jsonErrorHandler };
