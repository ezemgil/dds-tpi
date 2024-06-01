import sequelize from "../config/database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Emula __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo SQL y a la base de datos
const sqlFilePath = path.join(__dirname, "init.sql");
const dbFilePath = path.join(__dirname, "peliculas.db");

// Verificar si el archivo de la base de datos existe
if (!fs.existsSync(dbFilePath)) {
  // Crear un archivo vacío para la base de datos
  fs.writeFileSync(dbFilePath, "");
  console.log(`Base de datos creada en ${dbFilePath}`);
}

async function runSQL() {
  try {
    const sqlScript = fs.readFileSync(sqlFilePath, "utf8");
    const sqlCommands = sqlScript
      .split(";")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0);
    for (const command of sqlCommands) {
      await sequelize.query(command);
    }
    console.log(`${sqlFilePath} ejecutado correctamente`);
  } catch (error) {
    console.error(`Error al ejecutar ${sqlFilePath}:`, error);
  } finally {
    sequelize.close();
  }
}

runSQL();
