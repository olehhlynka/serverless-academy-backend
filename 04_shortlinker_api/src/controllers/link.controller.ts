import { Request, Response } from "express";
import dbService from "../services/db.service";
import {
  createShortLink,
  generateString,
} from "../utils/helper.util";
import { Link } from "../interfaces/link.interface";

class LinkController {
  async addNewLink(req: Request, res: Response) {
    try {
      const actualLink = req.body.link;
      const existingLink = await dbService.findLinkByActual(
        actualLink
      );
      if (existingLink) {
        return res.status(201).send(existingLink.short);
      }
      const newLink: Link = {
        actual: actualLink,
        short: generateString(),
      };
      await dbService.saveLink(newLink);
      res.status(201).send(createShortLink(newLink.short));
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to create a new link" });
    }
  }

  async followShortLink(req: Request, res: Response) {
    try {
      const short = req.params.path;
      const link = await dbService.findLinkByShort(short);
      if (link) {
        return res.status(200).redirect(link.actual);
      }
      res.status(404).json({ error: "Link not found" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to find the link" });
    }
  }
}

export default new LinkController();
