# TPI | Desarrollo de Software | UTN FRC

## Descripción del Proyecto
Este proyecto grupal tiene como objetivo implementar un conjunto de Web APIs o REST APIs utilizando Node.js, Express y Sequelize. 

Se ha desarrollado un sistema de gestión de películas que permite a los usuarios registrados acceder a información sobre películas, cineastas, premios y academias.

Además, los usuarios pueden realizar búsquedas de películas por título, género, idioma, país, clasificación y fecha de estreno.

Las APIs implementan los métodos CRUD (Create, Read, Update, Delete) y se han realizado pruebas unitarias para asegurar su correcto funcionamiento.


## Integrantes del Grupo

| Legajo | Apellido y nombre       |
|--------|-------------------------|
|89765   | Gil Matías Ezequiel     |
|89768   | Gutiérrez Agustin Ioime |
|97848   | Witt Facundo            |

## Estructura del Proyecto

```
dds-tpi/
├── backend
│   ├── config
│   ├── controllers
│   ├── data
│   ├── middleware
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── security
│   ├── services
│   ├── src
│   ├── test
│   ├── utils
│   ├── server.js
│   ├── package-lock.json
│   └── package.json
└── frontend
    └── ...
```
### Descripción
- ```backend```: Contiene el código fuente del backend.
    - ```config```: Configuración de la base de datos.
    - ```controllers```: Controladores de las rutas.
    - ```data```: Archivos SQL para inicializar la base de datos además de la base de datos.
    - ```middleware```: middleware de manejo de errores y autenticación.
    - ```models```: Modelos de las tablas de la base de datos.
    - ```repositories```: Repositorios para acceder a los datos de la base de datos.
    - ```routes```: Rutas de la API.
    - ```services```: Servicios para la lógica de negocio.
    - ```src```: Archivos de configuración de la aplicación.
    - ```test```: Pruebas unitarias.
    - ```utils```: Funciones de utilidad.
    - ```server.js```: Archivo principal del backend.
- ```frontend```: Contiene el código fuente del frontend.

# Backend

## Dependencias
```bash
$ cd backend
$ npm install express nodemon cors dotenv sqlite3 aa-sqlite sequelize jsonwebtoken jest supertest @babel/core @babel/preset-env babel-jest bcrypt winston
```

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
- **Academias**: Información sobre academias que otorgan premios.
- **NominacionesPelicula**: Relación de películas con nominaciones recibidas en academias.
- **NominacionesCineasta**: Asociación de cineastas con nominaciones recibidas en academias.


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