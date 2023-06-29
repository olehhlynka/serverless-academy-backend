import app from "./src/app";
import { PORT } from "./src/config/constants.config";

app.listen(PORT, () => {
  console.log(
    `⚡️[server] Server is running on port ${PORT}`
  );
});
