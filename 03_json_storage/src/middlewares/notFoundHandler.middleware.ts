import { Request, Response, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).render("error", {
    message: "Not Found",
    status: 404,
  });
};

export { notFoundHandler };
