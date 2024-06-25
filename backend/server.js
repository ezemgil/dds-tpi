import app from "./src/app.js";
import sequelize from "./config/database.js";
import { logger } from "./src/utils/logger.js";

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    logger.info(`Servidor iniciado en http://localhost:${PORT}`);
  });
});
