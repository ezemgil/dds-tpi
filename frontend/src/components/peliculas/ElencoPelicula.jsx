import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import SectionTitle from "../home/SectionTitle";
import CineastaCard from "../card/CineastaCard";

const ElencoPelicula = ({ Elenco }) => {
  return (
    <>
      <div className="container my-5">
        <SectionTitle
          Titulo={
            <>
              <i class="fa-solid fa-clapperboard text-primary"></i>
              <span>Elenco</span>
            </>
          }
        />
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {/* En su lugar, usar un ForEach */}
          {Elenco.map((cineasta) => (
            <CineastaCard
              key={cineasta.id}
              Nombre={`${cineasta.nombre} ${cineasta.apellido}`}
              FechaNacimiento={cineasta.fechaNacimiento}
              Roles={cineasta.rol.map((rol) => rol.nombre)}
              Imagen={cineasta.imagen}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ElencoPelicula;
