import httpServer from ".";
import { logger } from "../utils/logger";

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  logger.info(`Server is listining at ${port}`);
});
