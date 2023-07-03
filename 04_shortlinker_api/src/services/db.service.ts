import { QueryResult } from "pg";
import db from "../configs/db.config";
import { Link } from "../interfaces/link.interface";

class DBService {
  async saveLink(link: Link): Promise<Link> {
    const queryResult: QueryResult<Link> = await db.query(
      `INSERT INTO links (actual, short) VALUES ($1, $2) RETURNING actual, short`,
      [link.actual, link.short]
    );
    return queryResult.rows[0];
  }

  async findLinkByShort(
    shortLink: string
  ): Promise<Link | undefined> {
    const queryResult: QueryResult<Link> = await db.query(
      `SELECT actual, short FROM links WHERE short = $1`,
      [shortLink]
    );
    return queryResult.rows[0];
  }

  async findLinkByActual(
    actualLink: string
  ): Promise<Link | undefined> {
    const queryResult: QueryResult<Link> = await db.query(
      `SELECT actual, short FROM links WHERE actual = $1`,
      [actualLink]
    );
    return queryResult.rows[0];
  }
}

export default new DBService();
