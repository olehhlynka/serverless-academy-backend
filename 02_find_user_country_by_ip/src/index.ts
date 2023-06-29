import express, {
  Express,
  Request,
  Response,
} from "express";
import net from "net";
import { PORT } from "./config/constants.config";
import { findCountryByIP } from "./data/ipData";

const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
  const ip = req.header("x-forwarded-for");
  if (ip && net.isIPv4(ip)) {
    const country = findCountryByIP(ip);
    res.send(`${country} - ${ip}`);
  }
});

app.listen(PORT, () => {
  console.log(
    `⚡️[server] Server is running on port ${PORT}`
  );
});
