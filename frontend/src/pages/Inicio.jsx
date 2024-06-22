import React from "react";
import { Helmet } from "react-helmet";

import Encabezado from "../components/home/Encabezado";
import SectionTitle from "../components/home/SectionTitle";
import PeliculaCard from "../components/card/PeliculaCard";
import CineastaCard from "../components/card/CineastaCard";
import { Link } from "react-router-dom";

const Inicio = () => {
  // Cambiar
  const tituloPeli = "El secreto de sus tests";
  const generos = ["Si", "Test", "Pruebas unitarias", "Pruebas de integración"];
  const fecha = "2024-06-21";
  const duracion = 69; // jiji
  const img = "https://via.placeholder.com/300";

  const nombre = "Cineasta de prueba";
  const fechac = "1992-06-21";
  const roles = ["Tester", "Productor", "Guionista"];
  const imgc = "https://via.placeholder.com/300";

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
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {/* En su lugar, usar un ForEach */}
          {Array.from({ length: 6 }).map((_, i) => (
            <PeliculaCard
              key={i}
              Titulo={tituloPeli}
              Generos={generos}
              FechaEstreno={fecha}
              Duracion={duracion}
              Imagen={img}
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

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {/* En su lugar, usar un ForEach */}
          {Array.from({ length: 6 }).map((_, i) => (
            <CineastaCard
              key={i}
              Nombre={nombre}
              FechaNacimiento={fechac}
              Roles={roles}
              Imagen={imgc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
