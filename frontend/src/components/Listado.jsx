import React from "react";
import SectionTitle from "./home/SectionTitle";

const Listado = ({ Titulo, Card, Boton }) => {
  return (
    <>
      <div className="container my-5">
        <SectionTitle Titulo={Titulo} Boton={Boton} />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {/* Si no hay contenido, mostrar un mensaje */}
          {Card?.length > 0 ? (
            Card
          ) : (
            <p className="text-center">No hay elementos para mostrar</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Listado;
