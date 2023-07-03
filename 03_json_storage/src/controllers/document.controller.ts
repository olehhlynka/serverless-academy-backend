import { Request, Response } from "express";
import dbService from "../services/db.service";

class DocumentController {
  async create(req: Request, res: Response) {
    try {
      const { path, fileName } = req.params;
      const existingDocument = await dbService.findDocument(
        path,
        fileName
      );
      if (existingDocument) {
        const updatedDocument =
          await dbService.updateDocument(
            existingDocument,
            JSON.stringify(req.body)
          );
        return res
          .status(201)
          .json(JSON.parse(updatedDocument.data));
      }
      const newDocument = await dbService.saveDocument(
        path,
        fileName,
        JSON.stringify(req.body)
      );
      res.status(201).json(JSON.parse(newDocument.data));
    } catch (error: any) {
      res.status(500).render("error", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async find(req: Request, res: Response, next: any) {
    try {
      const { path, fileName } = req.params;
      const document = await dbService.findDocument(
        path,
        fileName
      );
      if (document) {
        return res
          .status(200)
          .json(JSON.parse(document.data));
      }
      next();
    } catch (error: any) {
      res.status(500).render("error", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  }
}

export default new DocumentController();
