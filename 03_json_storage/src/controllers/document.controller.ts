import { Request, Response } from "express";
import {
  saveDocument,
  findDocument,
} from "../services/db.service";

class DocumentController {
  async saveDocument(req: Request, res: Response) {
    try {
      const params = req.params;
      const newDocument = await saveDocument(
        params.path,
        params.fileName,
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

  async findDocument(req: Request, res: Response) {
    try {
      const params = req.params;
      const document = await findDocument(
        params.path,
        params.fileName
      );
      if (document) {
        return res
          .status(200)
          .json(JSON.parse(document.data));
      }
      res.status(404).render("error", {
        message: "Not Found",
        status: 404,
      });
    } catch (error: any) {
      res.status(500).render("error", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  }
}

export default new DocumentController();
