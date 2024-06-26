# TPI | Desarrollo de Software | UTN FRC

## Descripción del Proyecto
Este proyecto grupal tiene como objetivo implementar un conjunto de Web APIs o REST APIs utilizando Node.js, Express y Sequelize. 

Se ha desarrollado un sistema de gestión de películas que permite a los usuarios registrados acceder a información sobre películas, cineastas y premios .

Las APIs implementan los métodos CRUD (Create, Read, Update, Delete) y se han realizado pruebas unitarias para asegurar su correcto funcionamiento.


## Integrantes del Grupo

| Legajo | Apellido y nombre       |
|--------|-------------------------|
|89765   | Gil Matías Ezequiel     |
|89768   | Gutiérrez Agustin Ioime |
|97848   | Witt Facundo            |

# Backend

## Instalar dependencias
```bash
$ cd backend
$ npm install
```
- **express**: Framework web rápido, sin opiniones y minimalista para Node.js.
- **nodemon**: Herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en los archivos.
- **cors**: Middleware de Express para habilitar el acceso a recursos de diferentes dominios o puertos.
- **dotenv**: Módulo que carga variables de entorno desde un archivo .env en el proceso de Node.js.
- **sqlite3**: Controlador de base de datos SQLite para Node.js.
- **aa-sqlite**: Módulo que proporciona una interfaz de promesas para SQLite.
- **sequelize**: ORM (Object-Relational Mapping) basado en promesas para Node.js que admite varios dialectos de bases de datos.
- **jsonwebtoken**: Implementación de JSON Web Tokens (JWT) para Node.js.
- **jest**: Framework de pruebas unitarias para JavaScript.
- **supertest**: Biblioteca para realizar pruebas de integración HTTP en Node.js.
- **@babel/core**: Núcleo de Babel, un compilador de JavaScript.
- **@babel/preset-env**: Conjunto de plugins de Babel para habilitar características de JavaScript según el entorno de destino.
- **babel-jest**: Transformador de Babel para Jest, permitiendo utilizar características de JavaScript moderno en las pruebas.
- **bcrypt**: Librería para el hashing de contraseñas en Node.js.
- **winston**: Biblioteca de registro para Node.js con múltiples opciones de transporte y formato de registro.


## Variables de entorno
```env
# Configuración del servidor
PORT=3000

# Base de datos
DB_NAME=data/peliculas.db
DB_DIALECT=sqlite

# JWT
ACCESS_TOKEN_SECRET=accesstokensecret
REFRESH_TOKEN_SECRET=refreshtokensecret
ACCESS_TOKEN_EXPIRATION=15m

```

## DER (Diagrama Entidad-Relación)
![ERD](images/ERD.png)

### Tablas:
- **Paises**: Información sobre países (nombre y código).
- **Generos**: Géneros de películas.
- **TiposTraduccion**: Tipos de traducción de películas.
- **Idiomas**: Idiomas disponibles.
- **Clasificaciones**: Clasificaciones de películas.
- **TiposRol**: Roles de cineastas en películas.
- **Cineastas**: Información de cineastas (nombre, apellido, fecha de nacimiento, nacionalidad).
- **Peliculas**: Detalles de películas (título, descripción, calificación, duración, fecha de estreno, título original, clasificación).
- **RolesCineasta**: Asociación de cineastas con sus roles en películas.
- **PeliculaCineastaRol**: Relación de películas con cineastas y sus roles específicos.
- **IdiomasPelicula**: Asociación de películas con idiomas y tipos de traducción.
- **GenerosPelicula**: Relación de películas con sus géneros.
- **Usuarios**: Información de usuarios (nombre, clave con hash `bcrypt`, rol).
- **Premio**: Información sobre premios (Mejor película, mejor actor, mejor director, etc.).
- **NominacionesPelicula**: Relación de películas con nominaciones recibidas en academias.


## Base de datos
La base de datos utilizada es SQLite. Para crear la base de datos y cargar los datos iniciales:
1. Asegurarse de haber instalado las dependencias necesarias: ```sqlite3```, ```aa-sqlite```, ```sequelize```.
2. Ejecutar el script ```runSQL``` para crear las tablas y cargar los datos iniciales especificados en el script ubicado en ```backend/data/init.sql```:
```bash
$ cd backend
$ node data/runSQL.js
```
3. Verificar que se haya creado el archivo ```peliculas.db``` en la carpeta ```backend/data/```.

## Seguridad
Se ha implementado un sistema de autenticación basado en JWT (JSON Web Tokens) para proteger las rutas de la API.
Existen 3 usuarios registrados en la base de datos, cada uno con un rol distinto:
| Usuario | Clave | Rol | Permisos |
|---------|-------|-----| -------- |
|admin    |admin  |admin| Completo |
|supervisor|supervisor|supervisor| Restringido a ciertas rutas |
|usuario  |usuario|usuario| Sólo lectura |

***Nota**: La clave de cada usuario se ha hasheado con `bcrypt` antes de ser almacenada en la base de datos.*

# Frontend

## Instalar dependencias
```bash
$ cd frontend
$ npm install
```

### Librerías utilizadas
- **@fortawesome/fontawesome-free**: Conjunto de iconos de FontAwesome.
- **axios**: Cliente HTTP para realizar peticiones a servidores.
- **bootstrap**: Framework de CSS para el diseño de la interfaz de usuario.
- **dotenv**: Carga variables de entorno desde un archivo .env.
- **moment**: Librería para manipular y formatear fechas y horas.
- **react**: Biblioteca de JavaScript para construir interfaces de usuario.
- **react-bootstrap**: Implementación de Bootstrap para React.
- **react-dom**: Renderizador de React para la web.
- **react-helmet**: Componente de React para manipular el encabezado del documento HTML.
- **react-hook-form**: Librería para manejar formularios en React.
- **react-router-dom**: Enrutador para aplicaciones de React.

## Variables de entorno
```env
# Configuración del servidor
SERVER_URL=http://localhost
PORT=3000
```
