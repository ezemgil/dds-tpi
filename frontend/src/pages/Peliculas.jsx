import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Listado from "../components/Listado";
import PeliculaCard from "../components/card/PeliculaCard";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

import peliculaService from "../services/pelicula.service";

const Peliculas = () => {
  const [Peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  async function buscar() {
    const response = await peliculaService.getByName(busqueda);
    setPeliculas(response.data);
  }

  async function getAll() {
    const response = await peliculaService.getAll();
    setPeliculas(response.data.peliculas);
  };

  useEffect(() => {
    getAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <>
      <Helmet>
        <title>Listado de películas</title>
      </Helmet>

      <div className="container mt-4">
        <SearchBar
          Placeholder="Buscar películas..."
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          buscar={buscar}
        />
      </div>

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
