-- Creación de la tabla Paises
CREATE TABLE Paises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    codigo TEXT
);

-- Creación de la tabla Generos
CREATE TABLE Generos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

-- Creación de la tabla TiposTraduccion
CREATE TABLE TiposTraduccion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

-- Creación de la tabla Idiomas
CREATE TABLE Idiomas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

-- Creación de la tabla Clasificaciones
CREATE TABLE Clasificaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- Creación de la tabla TiposRol
CREATE TABLE TiposRol (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

-- Creación de la tabla Cineastas
CREATE TABLE Cineastas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT,
    fecha_nacimiento DATE,
    nacionalidad INTEGER,
    nacionalidad2 INTEGER,
    FOREIGN KEY (nacionalidad) REFERENCES Paises(id)
);

-- Creación de la tabla Peliculas
CREATE TABLE Peliculas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    calificacion REAL(2,1),
    duracion INTEGER,
    fecha_estreno DATE,
    titulo_original TEXT,
    id_clasificacion INTEGER,
    FOREIGN KEY (id_clasificacion) REFERENCES Clasificaciones(id)
);

-- Creación de la tabla RolesCineasta
CREATE TABLE RolesCineasta (
    id_cineasta INTEGER,
    id_rol INTEGER,
    PRIMARY KEY (id_cineasta, id_rol),
    FOREIGN KEY (id_cineasta) REFERENCES Cineastas(id),
    FOREIGN KEY (id_rol) REFERENCES TiposRol(id)
);

-- Creación de la tabla PeliculaCineastaRol
CREATE TABLE PeliculaCineastaRol (
    id_pelicula INTEGER,
    id_cineasta INTEGER,
    id_rol INTEGER,
    PRIMARY KEY (id_pelicula, id_cineasta, id_rol),
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (id_cineasta) REFERENCES Cineastas(id),
    FOREIGN KEY (id_rol) REFERENCES TiposRol(id)
);

-- Creación de la tabla IdiomasPelicula
CREATE TABLE IdiomasPelicula (
    id_pelicula INTEGER,
    id_idioma INTEGER,
    tipo_traduccion INTEGER,
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (id_idioma) REFERENCES Idiomas(id),
    FOREIGN KEY (tipo_traduccion) REFERENCES TiposTraduccion(id)
);

-- Creación de la tabla GenerosPelicula
CREATE TABLE GenerosPelicula (
    id_pelicula INTEGER,
    id_genero INTEGER,
    PRIMARY KEY (id_pelicula, id_genero),
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (id_genero) REFERENCES Generos(id)
);

-- INSERSIÓN DE DATOS
-- Claficiaciones
INSERT INTO Clasificaciones (nombre, descripcion) VALUES ('R', 'Restringida'), ('PG-13', 'Mayores de 13 años'), ('PG', 'Mayores de 7 años'), ('G', 'Todo público'), ('NR', 'No recomendada'), ('NC-17', 'Mayores de 17 años');

-- Tipos de Rol
INSERT INTO TiposRol (nombre) VALUES ('Director'), ('Guionista'), ('Productor'), ('Actor/Actriz'), ('Narrador'), ('Doblaje'), ('Subtitulado'), ('Banda Sonora'), ('Cámara'), ('Edición'), ('Vestuario'), ('Maquillaje'), ('Animación'), ('Efectos Especiales'), ('Diseño de Producción'), ('Dirección de Arte'), ('Sonido'), ('Efectos de Sonido'), ('Efectos Visuales'), ('Stunt');

-- Generos
INSERT INTO Generos (nombre) VALUES ('Drama'), ('Crimen'), ('Misterio'), ('Fantasía'), ('Aventura'), ('Biografía'), ('Comedia'), ('Romance'), ('Ciencia Ficción'), ('Terror'), ('Acción'), ('Musical'), ('Animación'), ('Documental'), ('Histórica'), ('Bélica'), ('Western'), ('Deportes'), ('Familiar'), ('Thriller'), ('Suspenso'), ('Infantil'), ('Erótica'), ('Adultos');

-- Paises
INSERT INTO Paises (nombre, codigo) VALUES ('Alemania', 'DE'), ('Francia', 'FR'), ('Italia', 'IT'), ('Países Bajos', 'NL'), ('Dinamarca', 'DK'), ('Reino Unido', 'UK'), ('Grecia', 'GR'), ('España', 'ES'), ('Portugal', 'PT'), ('Finlandia', 'FI'), ('Suecia', 'SE'), ('República Checa', 'CZ'), ('Eslovaquia', 'SK'), ('Eslovenia', 'SI'), ('Estonia', 'EE'), ('Hungría', 'HU'), ('Letonia', 'LV'), ('Lituania', 'LT'), ('Malta', 'MT'), ('Polonia', 'PL'), ('Bulgaria', 'BG'), ('Irlanda', 'IE'), ('Rumanía', 'RO'), ('Croacia', 'HR'), ('Australia', 'AU'), ('Nueva Zelanda', 'NZ'), ('Estados Unidos', 'US'), ('Irlanda del Norte', 'UK-NIR');
INSERT INTO Paises (nombre, codigo) VALUES ('Argentina', 'AR'), ('Bolivia', 'BO'), ('Brasil', 'BR'), ('Chile', 'CL'), ('Colombia', 'CO'), ('Costa Rica', 'CR'), ('Cuba', 'CU'), ('Ecuador', 'EC'), ('El Salvador', 'SV'), ('Guatemala', 'GT'), ('Honduras', 'HN'), ('México', 'MX'), ('Nicaragua', 'NI'), ('Panamá', 'PA'), ('Paraguay', 'PY'), ('Perú', 'PE'), ('Puerto Rico', 'PR'), ('República Dominicana', 'DO'), ('Uruguay', 'UY'), ('Venezuela', 'VE');

-- Tipos de Traducción
INSERT INTO TiposTraduccion (nombre) VALUES ('Doblaje'), ('Subtitulado');

-- Idiomas
INSERT INTO Idiomas (nombre) VALUES ('Alemán'), ('Francés'), ('Italiano'), ('Neerlandés'), ('Danés'), ('Inglés'), ('Griego'), ('Español'), ('Portugués'), ('Finés'), ('Sueco'), ('Checo'), ('Eslovaco'), ('Esloveno'), ('Estonio'), ('Húngaro'), ('Letón'), ('Lituano'), ('Maltés'), ('Polaco'), ('Búlgaro'), ('Irlandés'), ('Rumano'), ('Croata');


-- Sueño de fuga
-- Dirección: Frank Darabont
-- Guionistas: Stephen King, Frank Darabont
-- Elenco: Tim Robbins, Morgan Freeman, Bob Gunton
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('Sueño de fuga', 'El banquero Andy Dufresne es arrestado por matar a su esposa y amante. Tras una dura adaptación, intenta mejorar las condiciones de la prisión y dar esperanza a sus compañeros.', 9.3, 142, '1994-10-14', 'The Shawshank Redemption', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (1, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (1, 6, 1), (1, 8, 2), (1, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2) VALUES ('Frank', 'Darabont', '1959-01-28', 2, 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (1, 1), (1, 2), (1, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 1, 1), (1, 1, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Stephen', 'King', '1947-09-21', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (2, 1), (2, 2), (2, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 2, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Tim', 'Robbins', '1958-10-16', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (3, 4), (3, 1), (3, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 3, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Morgan', 'Freeman', '1937-06-01', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (4, 4), (4, 1), (4, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 4, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Bob', 'Gunton', '1945-11-15', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (5, 4), (5, 8);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 5, 4);


-- El padrino
-- Dirección: Francis Ford Coppola
-- Guionistas: Mario Puzo, Francis Ford Coppola
-- Elenco: Marlon Brando, Al Pacino, James Caan    
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El padrino', 'Don Vito Corleone, jefe de una de las cinco familias de la mafia de Nueva York, intenta sobrevivir y prosperar en medio de la violencia, la traición y la corrupción.', 9.2, 175, '1972-03-24', 'The Godfather', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (2, 1), (2, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (2, 6, 1), (2, 8, 2), (2, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Francis Ford', 'Coppola', '1939-04-07', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (6, 1), (6, 2), (6, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 6, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Mario', 'Puzo', '1920-10-15', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (7, 1), (7, 2), (7, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Marlon', 'Brando', '1924-04-03', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (8, 4), (8, 1), (8, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 8, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Al', 'Pacino', '1940-04-25', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (9, 4), (9, 1), (9, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 9, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('James', 'Caan', '1940-03-26', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (10, 4), (10, 1), (10, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 10, 4);

-- Batman: El caballero de la noche
-- Dirección: Christopher Nolan
-- Guionistas: Jonathan Nolan, Christopher Nolan, David S. Goyer
-- Elenco: Christian Bale, Heath Ledger, Aaron Eckhart
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El caballero de la noche', 'Batman, Gordon y Harvey Dent se unen para enfrentar al caos desatado por un criminal conocido como el Joker, quien empuja a Gotham a la anarquía.', 9.0, 152, '2008-07-18', 'The Dark Knight', 2);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (3, 11), (3, 2), (3, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (3, 6, 1), (3, 8, 2), (3, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Christopher', 'Nolan', '1970-07-30', 6);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (11, 1), (11, 2), (11, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 11, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Jonathan', 'Nolan', '1976-06-06', 6);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (12, 1), (12, 2), (12, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 12, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('David S.', 'Goyer', '1965-12-22', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (13, 1), (13, 2), (13, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 13, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2) VALUES ('Christian', 'Bale', '1974-01-30', 6, 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (14, 4), (14, 1), (14, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 14, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2) VALUES ('Heath', 'Ledger', '1979-04-04', 25, 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (15, 4), (15, 1), (15, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 15, 4);

-- El padrino: Parte II
-- Dirección: Francis Ford Coppola
-- Guionistas: Francis Ford Coppola, Mario Puzo
-- Elenco: Al Pacino, Robert De Niro, Robert Duvall
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El padrino: Parte II', 'Michael Corleone expande su imperio criminal y mantiene el control de su familia, mientras se enfrenta a la traición y la venganza.', 9.0, 202, '1974-12-20', 'The Godfather: Part II', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (4, 1), (4, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (4, 6, 1), (4, 8, 2), (4, 7, 2);

INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (4, 6, 1), (4, 6, 2), (4, 7, 2), (4, 8, 2), (4, 9, 4), (4, 10, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Robert', 'De Niro', '1943-08-17', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (16, 4), (16, 1), (16, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (4, 16, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Robert', 'Duvall', '1931-01-05', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (17, 4), (17, 1), (17, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (4, 17, 4);


-- 12 hombres en pugna
-- Dirección: Sidney Lumet
-- Guionista: Reginald Rose
-- Elenco: Henry Fonda, Lee J. Cobb, Martin Balsam
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('12 hombres en pugna', 'Un jurado debe decidir si un joven es culpable de asesinato, pero un miembro disiente y trata de convencer a los demás de su inocencia.', 8.9, 96, '1957-04-10', '12 Angry Men', 4);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (5, 1), (5, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (5, 6, 1), (5, 8, 2), (5, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Sidney', 'Lumet', '1924-06-25', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (18, 1), (18, 2), (18, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 18, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Reginald', 'Rose', '1920-12-10', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (19, 1), (19, 2), (19, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 19, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Henry', 'Fonda', '1905-05-16', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (20, 4), (20, 1), (20, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 20, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Lee J.', 'Cobb', '1911-12-08', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (21, 4), (21, 1), (21, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 21, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Martin', 'Balsam', '1919-11-04', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (22, 4), (22, 1), (22, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 22, 4);

-- La lista de Schindler
-- Dirección: Steven Spielberg
-- Guionistas: Thomas Keneally, Steven Zaillian
-- Elenco: Liam Neeson, Ralph Fiennes, Ben Kingsley
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('La lista de Schindler', 'Oskar Schindler gasta toda su fortuna para salvar a más de mil judíos de ser asesinados en Auschwitz durante la Segunda Guerra Mundial.', 8.9, 195, '1993-12-15', 'Schindler''s List', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (6, 6), (6, 1), (6, 15);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (6, 6, 1), (6, 8, 2), (6, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Steven', 'Spielberg', '1946-12-18', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (23, 1), (23, 2), (23, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 23, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Thomas', 'Keneally', '1935-10-07', 25);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (24, 1), (24, 2), (24, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 24, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Steven', 'Zaillian', '1953-01-30', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (25, 1), (25, 2), (25, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 25, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2) VALUES ('Liam', 'Neeson', '1952-06-07', 6, 28);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (26, 4), (26, 1), (26, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 26, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Ralph', 'Fiennes', '1962-12-22', 6);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (27, 4), (27, 1), (27, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 27, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Ben', 'Kingsley', '1943-12-31', 6);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (28, 4), (28, 1), (28, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 28, 4);

-- El señor de los anillos: El retorno del rey
-- Dirección: Peter Jackson
-- Guionistas: J.R.R. Tolkien, Fran Walsh, Philippa Boyens
-- Elenco: Elijah Wood, Ian McKellen, Orlando Bloom
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El señor de los anillos: El retorno del rey', 'Los ejércitos de Sauron han atacado Minas Tirith, la capital de Gondor. Nunca antes ha sido tan importante que Frodo y Sam lleguen a Mordor.', 8.9, 201, '2003-12-17', 'The Lord of the Rings: The Return of the King', 2);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (7, 11), (7, 5), (7, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (7, 6, 1), (7, 8, 2), (7, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Peter', 'Jackson', '1961-10-31', 26);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (29, 1), (29, 2), (29, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 29, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('J.R.R.', 'Tolkien', '1892-01-03', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (30, 1), (30, 2), (30, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 30, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Fran', 'Walsh', '1959-01-10', 26);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (31, 1), (31, 2), (31, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 31, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Philippa', 'Boyens', '1962-11-28', 26);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (32, 1), (32, 2), (32, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 32, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Elijah', 'Wood', '1981-01-28', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (33, 4), (33, 1), (33, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 33, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Ian', 'McKellen', '1939-05-25', 26);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (34, 4), (34, 1), (34, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 34, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Orlando', 'Bloom', '1977-01-13', 26);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (35, 4), (35, 1), (35, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 35, 4);

-- Tiempos violentos
-- Dirección: Quentin Tarantino
-- Guionistas: Quentin Tarantino, Roger Avary
-- Elenco: John Travolta, Uma Thurman, Samuel L. Jackson
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('Tiempos violentos', 'Dos matones, un boxeador en decadencia y un gánster, se ven envueltos en una trama de traición y venganza en Los Ángeles de 1992.', 8.9, 154, '1994-10-14', 'Pulp Fiction', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (8, 1), (8, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (8, 6, 1), (8, 8, 2), (8, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Quentin', 'Tarantino', '1963-03-27', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (36, 1), (36, 2), (36, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 36, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Roger', 'Avary', '1965-08-23', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (37, 1), (37, 2), (37, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 37, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('John', 'Travolta', '1954-02-18', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (38, 4), (38, 1), (38, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 38, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Uma', 'Thurman', '1970-04-29', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (39, 4), (39, 1), (39, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 39, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Samuel L.', 'Jackson', '1948-12-21', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (40, 4), (40, 1), (40, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 40, 4);

-- El señor de los anillos: La comunidad del anillo
-- Dirección: Peter Jackson
-- Guionistas: J.R.R. Tolkien, Fran Walsh, Philippa Boyens
-- Elenco: Elijah Wood, Viggo Mortensen, Ian McKellen
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El señor de los anillos: La comunidad del anillo', 'Un joven hobbit llamado Frodo Bolsón es encargado con una tarea épica: destruir un anillo mágico de poder antes de que caiga en manos del malvado Sauron.', 8.8, 178, '2001-12-19', 'The Lord of the Rings: The Fellowship of the Ring', 2);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (9, 11), (9, 5), (9, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (9, 6, 1), (9, 8, 2), (9, 7, 2);

INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (9, 29, 1), (9, 30, 2), (9, 31, 2), (9, 32, 2), (9, 33, 4), (9, 34, 4), (9, 35, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2) VALUES ('Viggo', 'Mortensen', '1958-10-20', 27, 5);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (41, 4), (41, 1), (41, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (9, 41, 4);

-- El bueno, el malo y el feo
-- Dirección: Sergio Leone
-- Guionistas: Luciano Vincenzoni, Sergio Leone, Agenore Incrocci
-- Elenco: Clint Eastwood, Eli Wallach, Lee Van Cleef
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El bueno, el malo y el feo', 'Tres hombres buscan un tesoro escondido en un cementerio, pero cada uno tiene su propio plan para quedarse con él.', 8.8, 161, '1966-12-23', 'Il buono, il brutto, il cattivo', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (10, 1), (10, 5), (10, 17);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma, tipo_traduccion) VALUES (10, 6, 1), (10, 8, 2), (10, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Sergio', 'Leone', '1929-01-03', 3);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (42, 1), (42, 2), (42, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 42, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Luciano', 'Vincenzoni', '1926-03-07', 3);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (43, 1), (43, 2), (43, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 43, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Agenore', 'Incrocci', '1919-07-04', 3);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (44, 1), (44, 2), (44, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 44, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Clint', 'Eastwood', '1930-05-31', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (45, 4), (45, 1), (45, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 45, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Eli', 'Wallach', '1915-12-07', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (46, 4), (46, 1), (46, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 46, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad) VALUES ('Lee Van', 'Cleef', '1925-01-09', 27);
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (47, 4), (47, 1), (47, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 47, 4);
