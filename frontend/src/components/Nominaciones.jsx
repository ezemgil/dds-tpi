import React from "react";
import SectionTitle from "./home/SectionTitle";
import NominacionCard from "./card/NominacionCard";

const NominacionesPelicula = ({ Nominaciones }) => {
  return (
    <div className="container">
      <SectionTitle
        Titulo={
          <>
            <i className="fa-solid fa-trophy text-warning"></i>
            <span>Nominaciones y premios</span>
          </>
        }
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        {Nominaciones.map((nominacion) => (
          <NominacionCard key={nominacion.id} Nominacion={nominacion} />
        ))}
      </div>
    </div>
  );
};

export default NominacionesPelicula;
