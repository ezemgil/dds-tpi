CREATE TABLE IF NOT EXISTS Paises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    codigo TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Generos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Idiomas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Clasificaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS TiposRol (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Cineastas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_fallecimiento DATE,
    bibliografia TEXT,
    imagen BLOB,
    nacionalidad INTEGER NOT NULL,
    nacionalidad2 INTEGER,
    FOREIGN KEY (nacionalidad) REFERENCES Paises(id)
);

CREATE TABLE IF NOT EXISTS Peliculas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    calificacion REAL,
    duracion INTEGER NOT NULL,
    fecha_estreno DATE NOT NULL DEFAULT CURRENT_DATE,
    titulo_original TEXT NOT NULL,
    imagen BLOB,
    id_clasificacion INTEGER,
    FOREIGN KEY (id_clasificacion) REFERENCES Clasificaciones(id)
);

CREATE TABLE IF NOT EXISTS RolesCineasta (
    id_cineasta INTEGER,
    id_rol INTEGER,
    PRIMARY KEY (id_cineasta, id_rol),
    FOREIGN KEY (id_cineasta) REFERENCES Cineastas(id),
    FOREIGN KEY (id_rol) REFERENCES TiposRol(id)
);

CREATE TABLE IF NOT EXISTS PeliculaCineastaRol (
    id_pelicula INTEGER,
    id_cineasta INTEGER,
    id_rol INTEGER,
    PRIMARY KEY (id_pelicula, id_cineasta, id_rol),
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (id_cineasta) REFERENCES Cineastas(id),
    FOREIGN KEY (id_rol) REFERENCES TiposRol(id)
);

CREATE TABLE IF NOT EXISTS IdiomasPelicula (
    id_pelicula INTEGER,
    id_idioma INTEGER,
    PRIMARY KEY (id_pelicula, id_idioma),
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (id_idioma) REFERENCES Idiomas(id)
);

CREATE TABLE IF NOT EXISTS GenerosPelicula (
    id_pelicula INTEGER,
    id_genero INTEGER,
    PRIMARY KEY (id_pelicula, id_genero),
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (id_genero) REFERENCES Generos(id)
);

CREATE TABLE IF NOT EXISTS Usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    clave TEXT NOT NULL,
    id_rol INTEGER,
    FOREIGN KEY (id_rol) REFERENCES RolesUsuario(id)
);

CREATE TABLE IF NOT EXISTS Premios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS NominacionesPelicula (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_premio INTEGER,
    id_pelicula INTEGER,
    fecha_nominacion DATE NOT NULL,
    fue_ganador INTEGER NOT NULL DEFAULT 0 CHECK(fue_ganador IN (0, 1)),
    FOREIGN KEY (id_premio) REFERENCES Premios(id),
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id)
);

CREATE TABLE IF NOT EXISTS RolesUsuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rol TEXT NOT NULL UNIQUE
);


INSERT INTO Clasificaciones (nombre, descripcion) VALUES ('R', 'Restringida'), ('PG-13', 'Mayores de 13 años'), ('PG', 'Mayores de 7 años'), ('G', 'Todo público'), ('NR', 'No recomendada'), ('NC-17', 'Mayores de 17 años');

INSERT INTO TiposRol (nombre) VALUES ('Director'), ('Guionista'), ('Productor'), ('Intérprete'), ('Narrador'), ('Doblaje'), ('Subtitulado'), ('Banda Sonora'), ('Cámara'), ('Edición'), ('Vestuario'), ('Maquillaje'), ('Animación'), ('Efectos Especiales'), ('Diseño de Producción'), ('Dirección de Arte'), ('Sonido'), ('Efectos de Sonido'), ('Efectos Visuales'), ('Stunt');

INSERT INTO Generos (nombre) VALUES ('Drama'), ('Crimen'), ('Misterio'), ('Fantasía'), ('Aventura'), ('Biografía'), ('Comedia'), ('Romance'), ('Ciencia Ficción'), ('Terror'), ('Acción'), ('Musical'), ('Animación'), ('Documental'), ('Histórica'), ('Bélica'), ('Western'), ('Deportes'), ('Familiar'), ('Thriller'), ('Suspenso'), ('Infantil');

INSERT INTO Paises (nombre, codigo) VALUES ('Alemania', 'DE'), ('Francia', 'FR'), ('Italia', 'IT'), ('Países Bajos', 'NL'), ('Dinamarca', 'DK'), ('Reino Unido', 'UK'), ('Grecia', 'GR'), ('España', 'ES'), ('Portugal', 'PT'), ('Finlandia', 'FI'), ('Suecia', 'SE'), ('República Checa', 'CZ'), ('Eslovaquia', 'SK'), ('Eslovenia', 'SI'), ('Estonia', 'EE'), ('Hungría', 'HU'), ('Letonia', 'LV'), ('Lituania', 'LT'), ('Malta', 'MT'), ('Polonia', 'PL'), ('Bulgaria', 'BG'), ('Irlanda', 'IE'), ('Rumanía', 'RO'), ('Croacia', 'HR'), ('Australia', 'AU'), ('Nueva Zelanda', 'NZ'), ('Estados Unidos', 'US'), ('Irlanda del Norte', 'UK-NIR');
INSERT INTO Paises (nombre, codigo) VALUES ('Argentina', 'AR'), ('Bolivia', 'BO'), ('Brasil', 'BR'), ('Chile', 'CL'), ('Colombia', 'CO'), ('Costa Rica', 'CR'), ('Cuba', 'CU'), ('Ecuador', 'EC'), ('El Salvador', 'SV'), ('Guatemala', 'GT'), ('Honduras', 'HN'), ('México', 'MX'), ('Nicaragua', 'NI'), ('Panamá', 'PA'), ('Paraguay', 'PY'), ('Perú', 'PE'), ('Puerto Rico', 'PR'), ('República Dominicana', 'DO'), ('Uruguay', 'UY'), ('Venezuela', 'VE');

INSERT INTO Idiomas (nombre) VALUES ('Alemán'), ('Francés'), ('Italiano'), ('Neerlandés'), ('Danés'), ('Inglés'), ('Griego'), ('Español'), ('Portugués'), ('Finés'), ('Sueco'), ('Checo'), ('Eslovaco'), ('Esloveno'), ('Estonio'), ('Húngaro'), ('Letón'), ('Lituano'), ('Maltés'), ('Polaco'), ('Búlgaro'), ('Irlandés'), ('Rumano'), ('Croata');

INSERT INTO Premios (nombre) VALUES ('Mejor Película'), ('Mejor Director'), ('Mejor Actor'), ('Mejor Actriz'), ('Mejor Guión'), ('Mejor Fotografía'), ('Mejor Diseño de Producción'), ('Mejor Edición'), ('Mejor Banda Sonora'), ('Mejor Sonido');
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('Sueño de fuga', 'El banquero Andy Dufresne es arrestado por matar a su esposa y amante. Tras una dura adaptación, intenta mejorar las condiciones de la prisión y dar esperanza a sus compañeros.', 9.3, 142, '1994-10-14', 'The Shawshank Redemption', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (1, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (1, 6), (1, 8), (1, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2, bibliografia) VALUES ('Frank', 'Darabont', '1959-01-28', 2, 27, 'Frank Darabont es un director, guionista y productor húngaro-estadounidense, conocido por su trabajo en películas como Sueño de fuga, La niebla y La milla verde.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (1, 1), (1, 2), (1, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 1, 1), (1, 1, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Stephen', 'King', '1947-09-21', 27, 'Stephen King es un escritor, guionista y productor estadounidense, conocido por su trabajo en películas como Sueño de fuga, El resplandor y Cementerio de animales.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (2, 1), (2, 2), (2, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 2, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Tim', 'Robbins', '1958-10-16', 27, 'Tim Robbins es un actor, director y productor estadounidense, conocido por su trabajo en películas como Sueño de fuga, Mystic River y Cadena perpetua.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (3, 4), (3, 1), (3, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 3, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Morgan', 'Freeman', '1937-06-01', 27, 'Morgan Freeman es un actor, director y productor estadounidense, conocido por su trabajo en películas como Sueño de fuga, Cadena perpetua y Seven.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (4, 4), (4, 1), (4, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 4, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Bob', 'Gunton', '1945-11-15', 27, 'Bob Gunton es un actor, director y productor estadounidense, conocido por su trabajo en películas como Sueño de fuga, JFK y Patch Adams.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (5, 4), (5, 8);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (1, 5, 4); 
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El padrino', 'Don Vito Corleone, jefe de una de las cinco familias de la mafia de Nueva York, intenta sobrevivir y prosperar en medio de la violencia, la traición y la corrupción.', 9.2, 175, '1972-03-24', 'The Godfather', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (2, 1), (2, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (2, 6), (2, 8), (2, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Francis Ford', 'Coppola', '1939-04-07', 27, 'Francis Ford Coppola es un director, guionista y productor estadounidense, conocido por su trabajo en películas como El padrino, Apocalypse Now y La conversación.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (6, 1), (6, 2), (6, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 6, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Mario', 'Puzo', '1920-10-15', 27, 'Mario Puzo es un escritor, guionista y productor estadounidense, conocido por su trabajo en películas como El padrino, El padrino: Parte II y El padrino: Parte III.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (7, 1), (7, 2), (7, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 7, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Marlon', 'Brando', '1924-04-03', 27, 'Marlon Brando es un actor, director y productor estadounidense, conocido por su trabajo en películas como El padrino, Apocalypse Now y Un tranvía llamado deseo.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (8, 4), (8, 1), (8, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 8, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Al', 'Pacino', '1940-04-25', 27, 'Al Pacino es un actor, director y productor estadounidense, conocido por su trabajo en películas como El padrino, Scarface y El precio del poder.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (9, 4), (9, 1), (9, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 9, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('James', 'Caan', '1940-03-26', 27, 'James Caan es un actor, director y productor estadounidense, conocido por su trabajo en películas como El padrino, Misery y Rollerball.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (10, 4), (10, 1), (10, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (2, 10, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El caballero de la noche', 'Batman, Gordon y Harvey Dent se unen para enfrentar al caos desatado por un criminal conocido como el Joker, quien empuja a Gotham a la anarquía.', 9.0, 152, '2008-07-18', 'The Dark Knight', 2);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (3, 11), (3, 2), (3, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (3, 6), (3, 8), (3, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Christopher', 'Nolan', '1970-07-30', 6, 'Christopher Nolan es un director, guionista y productor británico, conocido por su trabajo en películas como El caballero de la noche, Origen y Dunkerque.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (11, 1), (11, 2), (11, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 11, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Jonathan', 'Nolan', '1976-06-06', 6, 'Jonathan Nolan es un guionista, productor y director británico, conocido por su trabajo en películas como El caballero de la noche, Origen y Interestelar.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (12, 1), (12, 2), (12, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 12, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('David S.', 'Goyer', '1965-12-22', 27, 'David S. Goyer es un guionista, director y productor estadounidense, conocido por su trabajo en películas como El caballero de la noche, Blade y Batman v Superman: El origen de la justicia.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (13, 1), (13, 2), (13, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 13, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2, bibliografia) VALUES ('Christian', 'Bale', '1974-01-30', 6, 27, 'Christian Bale es un actor, director y productor británico-estadounidense, conocido por su trabajo en películas como El caballero de la noche, El maquinista y La gran estafa americana.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (14, 4), (14, 1), (14, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 14, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2, bibliografia) VALUES ('Heath', 'Ledger', '1979-04-04', 25, 27, 'Heath Ledger fue un actor, director y productor australiano-estadounidense, conocido por su trabajo en películas como El caballero de la noche, Secreto en la montaña y Brokeback Mountain.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (15, 4), (15, 1), (15, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (3, 15, 4);
INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El padrino: Parte II', 'Michael Corleone expande su imperio criminal y mantiene el control de su familia, mientras se enfrenta a la traición y la venganza.', 9.0, 202, '1974-12-20', 'The Godfather: Part II', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (4, 1), (4, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (4, 6), (4, 8), (4, 7);

INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (4, 6, 1), (4, 6, 2), (4, 7, 2), (4, 8, 2), (4, 9, 4), (4, 10, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Robert', 'De Niro', '1943-08-17', 27, 'Robert De Niro es un actor, director y productor estadounidense, conocido por su trabajo en películas como El padrino: Parte II, Taxi Driver y Toro salvaje.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (16, 4), (16, 1), (16, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (4, 16, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Robert', 'Duvall', '1931-01-05', 27, 'Robert Duvall es un actor, director y productor estadounidense, conocido por su trabajo en películas como El padrino: Parte II, Apocalypse Now y La noche del cazador.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (17, 4), (17, 1), (17, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (4, 17, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('12 hombres en pugna', 'Un jurado debe decidir si un joven es culpable de asesinato, pero un miembro disiente y trata de convencer a los demás de su inocencia.', 8.9, 96, '1957-04-10', '12 Angry Men', 4);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (5, 1), (5, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (5, 6), (5, 8), (5, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Sidney', 'Lumet', '1924-06-25', 27, 'Sidney Lumet es un director, guionista y productor estadounidense, conocido por su trabajo en películas como 12 hombres en pugna, Serpico y Tarde de perros.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (18, 1), (18, 2), (18, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 18, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Reginald', 'Rose', '1920-12-10', 27, 'Reginald Rose es un guionista, director y productor estadounidense, conocido por su trabajo en películas como 12 hombres en pugna, The Defenders y Studio One.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (19, 1), (19, 2), (19, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 19, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Henry', 'Fonda', '1905-05-16', 27, 'Henry Fonda es un actor, director y productor estadounidense, conocido por su trabajo en películas como 12 hombres en pugna, La uvas de la ira y Doce del patíbulo.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (20, 4), (20, 1), (20, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 20, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Lee J.', 'Cobb', '1911-12-08', 27, 'Lee J. Cobb es un actor, director y productor estadounidense, conocido por su trabajo en películas como 12 hombres en pugna, La ley del silencio y El exorcista.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (21, 4), (21, 1), (21, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 21, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Martin', 'Balsam', '1919-11-04', 27, 'Martin Balsam es un actor, director y productor estadounidense, conocido por su trabajo en películas como 12 hombres en pugna, Psicosis y Todos los hombres del presidente.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (22, 4), (22, 1), (22, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (5, 22, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('La lista de Schindler', 'Oskar Schindler gasta toda su fortuna para salvar a más de mil judíos de ser asesinados en Auschwitz durante la Segunda Guerra Mundial.', 8.9, 195, '1993-12-15', 'Schindler''s List', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (6, 6), (6, 1), (6, 15);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (6, 6), (6, 8), (6, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Steven', 'Spielberg', '1946-12-18', 27, 'Steven Spielberg es un director, guionista y productor estadounidense, conocido por su trabajo en películas como La lista de Schindler, E.T. el extraterrestre y Parque Jurásico.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (23, 1), (23, 2), (23, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 23, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Thomas', 'Keneally', '1935-10-07', 25, 'Thomas Keneally es un escritor, guionista y productor australiano, conocido por su trabajo en películas como La lista de Schindler, El poder y la pasión y La hija de Ryan.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (24, 1), (24, 2), (24, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 24, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Steven', 'Zaillian', '1953-01-30', 27, 'Steven Zaillian es un guionista, director y productor estadounidense, conocido por su trabajo en películas como La lista de Schindler, American Gangster y La red social.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (25, 1), (25, 2), (25, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 25, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2, bibliografia) VALUES ('Liam', 'Neeson', '1952-06-07', 6, 28, 'Liam Neeson es un actor, director y productor británico-irlandés, conocido por su trabajo en películas como La lista de Schindler, Venganza y La amenaza fantasma.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (26, 4), (26, 1), (26, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 26, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Ralph', 'Fiennes', '1962-12-22', 6, 'Ralph Fiennes es un actor, director y productor británico, conocido por su trabajo en películas como La lista de Schindler, El paciente inglés y La dama de hierro.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (27, 4), (27, 1), (27, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 27, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Ben', 'Kingsley', '1943-12-31', 6, 'Ben Kingsley es un actor, director y productor británico, conocido por su trabajo en películas como La lista de Schindler, Gandhi y Hugo.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (28, 4), (28, 1), (28, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (6, 28, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El señor de los anillos: El retorno del rey', 'Los ejércitos de Sauron han atacado Minas Tirith, la capital de Gondor. Nunca antes ha sido tan importante que Frodo y Sam lleguen a Mordor.', 8.9, 201, '2003-12-17', 'The Lord of the Rings: The Return of the King', 2);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (7, 11), (7, 5), (7, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (7, 6), (7, 8), (7, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Peter', 'Jackson', '1961-10-31', 26, 'Peter Jackson es un director, guionista y productor neozelandés, conocido por su trabajo en películas como El señor de los anillos: El retorno del rey, King Kong y El hobbit: Un viaje inesperado.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (29, 1), (29, 2), (29, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 29, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('J.R.R.', 'Tolkien', '1892-01-03', 27, 'J.R.R. Tolkien fue un escritor, guionista y productor británico, conocido por su trabajo en películas como El señor de los anillos: El retorno del rey, El señor de los anillos: La comunidad del anillo y El señor de los anillos: Las dos torres.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (30, 1), (30, 2), (30, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 30, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Fran', 'Walsh', '1959-01-10', 26, 'Fran Walsh es una guionista, directora y productora neozelandesa, conocida por su trabajo en películas como El señor de los anillos: El retorno del rey, King Kong y El hobbit: Un viaje inesperado.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (31, 1), (31, 2), (31, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 31, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Philippa', 'Boyens', '1962-11-28', 26, 'Philippa Boyens es una guionista, directora y productora neozelandesa, conocida por su trabajo en películas como El señor de los anillos: El retorno del rey, King Kong y El hobbit: Un viaje inesperado.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (32, 1), (32, 2), (32, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 32, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Elijah', 'Wood', '1981-01-28', 27, 'Elijah Wood es un actor, director y productor estadounidense, conocido por su trabajo en películas como El señor de los anillos: El retorno del rey, El señor de los anillos: La comunidad del anillo y El señor de los anillos: Las dos torres.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (33, 4), (33, 1), (33, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 33, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Ian', 'McKellen', '1939-05-25', 26, 'Ian McKellen es un actor, director y productor británico, conocido por su trabajo en películas como El señor de los anillos: El retorno del rey, El señor de los anillos: La comunidad del anillo y El código Da Vinci.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (34, 4), (34, 1), (34, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 34, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Orlando', 'Bloom', '1977-01-13', 26, 'Orlando Bloom es un actor, director y productor británico, conocido por su trabajo en películas como El señor de los anillos: El retorno del rey, Piratas del Caribe: La maldición del Perla Negra y El hobbit: Un viaje inesperado.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (35, 4), (35, 1), (35, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (7, 35, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('Tiempos violentos', 'Dos matones, un boxeador en decadencia y un gánster, se ven envueltos en una trama de traición y venganza en Los Ángeles de 1992.', 8.9, 154, '1994-10-14', 'Pulp Fiction', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (8, 1), (8, 2);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (8, 6), (8, 8), (8, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Quentin', 'Tarantino', '1963-03-27', 27, 'Quentin Tarantino es un director, guionista y productor estadounidense, conocido por su trabajo en películas como Tiempos violentos, Kill Bill y Bastardos sin gloria.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (36, 1), (36, 2), (36, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 36, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Roger', 'Avary', '1965-08-23', 27, 'Roger Avary es un guionista, director y productor estadounidense, conocido por su trabajo en películas como Tiempos violentos, Pulp Fiction y Silent Hill.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (37, 1), (37, 2), (37, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 37, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('John', 'Travolta', '1954-02-18', 27, 'John Travolta es un actor, director y productor estadounidense, conocido por su trabajo en películas como Tiempos violentos, Grease y Fiebre de sábado por la noche.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (38, 4), (38, 1), (38, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 38, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Uma', 'Thurman', '1970-04-29', 27, 'Uma Thurman es una actriz, directora y productora estadounidense, conocida por su trabajo en películas como Tiempos violentos, Kill Bill y Pulp Fiction.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (39, 4), (39, 1), (39, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 39, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Samuel L.', 'Jackson', '1948-12-21', 27, 'Samuel L. Jackson es un actor, director y productor estadounidense, conocido por su trabajo en películas como Tiempos violentos, Pulp Fiction y Los Vengadores.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (40, 4), (40, 1), (40, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (8, 40, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El señor de los anillos: La comunidad del anillo', 'Un joven hobbit llamado Frodo Bolsón es encargado con una tarea épica: destruir un anillo mágico de poder antes de que caiga en manos del malvado Sauron.', 8.8, 178, '2001-12-19', 'The Lord of the Rings: The Fellowship of the Ring', 2);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (9, 11), (9, 5), (9, 1);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (9, 6), (9, 8), (9, 7);

INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (9, 29, 1), (9, 30, 2), (9, 31, 2), (9, 32, 2), (9, 33, 4), (9, 34, 4), (9, 35, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, nacionalidad2, bibliografia) VALUES ('Viggo', 'Mortensen', '1958-10-20', 27, 5, 'Viggo Mortensen es un actor, director y productor estadounidense-danés, conocido por su trabajo en películas como El señor de los anillos: La comunidad del anillo, Capitán Fantástico y Green Book.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (41, 4), (41, 1), (41, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (9, 41, 4);

INSERT INTO Peliculas (titulo, descripcion, calificacion, duracion, fecha_estreno, titulo_original, id_clasificacion)
    VALUES ('El bueno, el malo y el feo', 'Tres hombres buscan un tesoro escondido en un cementerio, pero cada uno tiene su propio plan para quedarse con él.', 8.8, 161, '1966-12-23', 'Il buono, il brutto, il cattivo', 1);
INSERT INTO GenerosPelicula (id_pelicula, id_genero) VALUES (10, 1), (10, 5), (10, 17);
INSERT INTO IdiomasPelicula (id_pelicula, id_idioma) VALUES (10, 6), (10, 8), (10, 7);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Sergio', 'Leone', '1929-01-03', 3, 'Sergio Leone es un director, guionista y productor italiano, conocido por su trabajo en películas como El bueno, el malo y el feo, Por un puñado de dólares y La muerte tenía un precio.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (42, 1), (42, 2), (42, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 42, 1);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Luciano', 'Vincenzoni', '1926-03-07', 3, 'Luciano Vincenzoni es un guionista, director y productor italiano, conocido por su trabajo en películas como El bueno, el malo y el feo, Por un puñado de dólares y La muerte tenía un precio.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (43, 1), (43, 2), (43, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 43, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Agenore', 'Incrocci', '1919-07-04', 3, 'Agenore Incrocci es un guionista, director y productor italiano, conocido por su trabajo en películas como El bueno, el malo y el feo, Por un puñado de dólares y La muerte tenía un precio.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (44, 1), (44, 2), (44, 4);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 44, 2);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Clint', 'Eastwood', '1930-05-31', 27, 'Clint Eastwood es un actor, director y productor estadounidense, conocido por su trabajo en películas como El bueno, el malo y el feo, Sin perdón y Gran Torino.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (45, 4), (45, 1), (45, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 45, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Eli', 'Wallach', '1915-12-07', 27, 'Eli Wallach es un actor, director y productor estadounidense, conocido por su trabajo en películas como El bueno, el malo y el feo, El padrino y El tren de las 3:10.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (46, 4), (46, 1), (46, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 46, 4);

INSERT INTO Cineastas (nombre, apellido, fecha_nacimiento, nacionalidad, bibliografia) VALUES ('Lee Van', 'Cleef', '1925-01-09', 27, 'Lee Van Cleef es un actor, director y productor estadounidense, conocido por su trabajo en películas como El bueno, el malo y el feo, La muerte tenía un precio y Por un puñado de dólares.');
INSERT INTO RolesCineasta (id_cineasta, id_rol) VALUES (47, 4), (47, 1), (47, 3);
INSERT INTO PeliculaCineastaRol (id_pelicula, id_cineasta, id_rol) VALUES (10, 47, 4);


INSERT INTO NominacionesPelicula (id_premio, id_pelicula, fecha_nominacion, fue_ganador) VALUES (1, 1, '1995-03-27', 0), (2, 1, '1995-03-27', 0), (3, 1, '1995-03-27', 0), (4, 1, '1995-03-27', 0), (5, 1, '1995-03-27', 0), (6, 1, '1995-03-27', 0), (7, 1, '1995-03-27', 0), (8, 1, '1995-03-27', 0), (9, 1, '1995-03-27', 0), (10, 1, '1995-03-27', 0);

INSERT INTO RolesUsuario (rol) VALUES ('Administrador'), ('Usuario');

INSERT INTO Usuarios (nombre, clave, id_rol) VALUES ('admin', '$2b$10$kXII2Vd5f3KOgUBbiJ7Oq.ChAHdEbszy4xHbzvQInvGBYc6rPQ3wS', 1); 
INSERT INTO Usuarios (nombre, clave, id_rol) VALUES ('usuario', '$2y$10$AnEZ7w7nGM9dTy1ListUJe6uigeQNHi1.v6HpLoqttqsU5C94t7oC', 2);

UPDATE Cineastas
SET fecha_fallecimiento = '1999-01-01'
WHERE nombre = 'Mario' AND apellido = 'Puzo';

UPDATE Cineastas
SET fecha_fallecimiento = '2004-01-01'
WHERE nombre = 'Marlon' AND apellido = 'Brando';

UPDATE Cineastas
SET fecha_fallecimiento = '2022-01-01'
WHERE nombre = 'James' AND apellido = 'Caan';

UPDATE Cineastas
SET fecha_fallecimiento = '2008-01-01'
WHERE nombre = 'Heath' AND apellido = 'Ledger';

UPDATE Cineastas
SET fecha_fallecimiento = '2011-01-01'
WHERE nombre = 'Sidney' AND apellido = 'Lumet';

UPDATE Cineastas
SET fecha_fallecimiento = '2007-01-01'
WHERE nombre = 'Reginald' AND apellido = 'Rose';

UPDATE Cineastas
SET fecha_fallecimiento = '1980-01-01'
WHERE nombre = 'Henry' AND apellido = 'Fonda';

UPDATE Cineastas
SET fecha_fallecimiento = '1976-01-01'
WHERE nombre = 'Lee' AND apellido = 'Cobb';

UPDATE Cineastas
SET fecha_fallecimiento = '1988-01-01'
WHERE nombre = 'Martin' AND apellido = 'Balsam';

UPDATE Cineastas
SET fecha_fallecimiento = '1989-01-01'
WHERE nombre = 'Sergio' AND apellido = 'Leone';

UPDATE Cineastas
SET fecha_fallecimiento = '2003-01-01'
WHERE nombre = 'Luciano' AND apellido = 'Vincenzoni';

UPDATE Cineastas
SET fecha_fallecimiento = '2005-01-01'
WHERE nombre = 'Agenore' AND apellido = 'Incrocci';

UPDATE Cineastas
SET fecha_fallecimiento = '2014-01-01'
WHERE nombre = 'Eli' AND apellido = 'Wallach';

UPDATE Cineastas
SET fecha_fallecimiento = '1989-01-01'
WHERE nombre = 'Lee' AND apellido = 'Van Cleef';
