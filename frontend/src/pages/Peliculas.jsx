import React from "react";
import { Helmet } from "react-helmet";
import Listado from "../components/Listado";
import PeliculaCard from "../components/card/PeliculaCard";
import { Link } from "react-router-dom";

const Peliculas = () => {
  // Cambiar
  const tituloPeli = "El secreto de sus tests";
  const generos = ["Si", "Test", "Pruebas unitarias", "Pruebas de integración"];
  const fecha = "2024-06-21";
  const duracion = 69; // jiji
  const img = "https://via.placeholder.com/300";

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
        Card={Array.from({ length: 19 }).map((_, i) => (
          <PeliculaCard
            key={i}
            Titulo={tituloPeli}
            Generos={generos}
            FechaEstreno={fecha}
            Duracion={duracion}
            Imagen={img}
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
