import sequelize from "./config/database.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    logger.info(`Servidor iniciado en http://localhost:${PORT}`);
  });
});