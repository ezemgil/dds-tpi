import app from "./src/app.js";
import sequelize from "./config/database.js";
import { logger } from "./src/utils/logger.js";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Emular __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

// Ruta al script runSQL.js
const runSQLScriptPath = path.join(__dirname, "data", "runSQL.js");

try {
    // Ejecutar el script runSQL.js
    execSync(`node ${runSQLScriptPath}`, { stdio: "inherit" });
    logger.info("Base de datos inicializada correctamente");
} catch (error) {
    logger.error("Error al inicializar la base de datos:", error);
    process.exit(1); // Salir si hay un error al inicializar la base de datos
}

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        logger.info(`Servidor iniciado en http://localhost:${PORT}`);
    });
});
