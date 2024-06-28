import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Encabezado from "../components/home/Encabezado";
import SectionTitle from "../components/home/SectionTitle";
import PeliculaCard from "../components/card/PeliculaCard";
import CineastaCard from "../components/card/CineastaCard";

// Servicios
import peliculaService from "../services/pelicula.service";
import cineastaService from "../services/cineasta.service";

const Inicio = () => {
  const [PeliculasTendencia, setPeliculasTendencia] = useState([]);
  const [CineastasPopulares, setCineastasPopulares] = useState([]);

  const cantidad = 8;

  useEffect(() => {
    peliculaService.getRandom(cantidad).then((response) => {
      setPeliculasTendencia(response.data);
    });
    cineastaService.getRandom(cantidad).then((response) => {
      setCineastasPopulares(response.data);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Inicio</title>
      </Helmet>

      <Encabezado />

      <div className="container my-5">
        <SectionTitle
          Titulo={
            <>
              <i className="fa-solid fa-fire text-warning"></i>
              <span>Películas en tendencia</span>
            </>
          }
          Boton={
            <Link to="/peliculas" className="btn btn-warning">
              Ver más <i className="fa-solid fa-arrow-right"></i>
            </Link>
          }
        />

        {/* Galería */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {PeliculasTendencia.map((pelicula) => (
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
        </div>
      </div>

      <div className="container my-5">
        <SectionTitle
          Titulo={
            <>
              <i className="fa-solid fa-film text-danger"></i>
              <span>Cineastas populares</span>
            </>
          }
          Boton={
            <Link to="/cineastas" className="btn btn-warning">
              Ver más <i className="fa-solid fa-arrow-right"></i>
            </Link>
          }
        />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {CineastasPopulares.map((cineasta) => (
            <CineastaCard
              key={cineasta.id}
              Id={cineasta.id}
              Nombre={`${cineasta.nombre} ${cineasta.apellido}`}
              FechaNacimiento={cineasta?.fecha_nacimiento}
              FechaFallecimiento={cineasta?.fecha_fallecimiento}
              Roles={cineasta?.roles?.map((rol) => rol.nombre)}
              Imagen={cineasta.imagen || "https://via.placeholder.com/300"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
