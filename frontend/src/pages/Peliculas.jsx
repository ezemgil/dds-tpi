import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Listado from "../components/Listado";
import PeliculaCard from "../components/card/PeliculaCard";
import { Link } from "react-router-dom";

import peliculaService from "../services/pelicula.service";

const Peliculas = () => {
  const [Peliculas, setPeliculas] = useState([]);
  useEffect(() => {
    peliculaService.getAll().then((response) => {
      setPeliculas(response.data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Listado de películas</title>
      </Helmet>

      <Listado
        Titulo={
          <>
            <i className="fa-solid fa-fire text-warning"></i>
            <span>Películas en tendencia</span>
          </>
        }
        Card={Peliculas.map((pelicula) => (
          <PeliculaCard
            key={pelicula.id}
            Id={pelicula.id}
            Titulo={pelicula.titulo}
            FechaEstreno={pelicula.fecha_estreno}
            Duracion={pelicula.duracion}
            Imagen={
              pelicula.imagen
                ? pelicula.imagen
                : "https://via.placeholder.com/300"
            }
            Generos={pelicula.generos.map((genero) => genero.nombre)}
          />
        ))}
        Boton={
          <Link to="/inicio" className="btn btn-warning">
            <i className="fa-solid fa-arrow-left"></i> Volver al inicio
          </Link>
        }
      />
    </>
  );
};

export default Peliculas;
