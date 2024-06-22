import React from "react";
import { Helmet } from "react-helmet";
import Listado from "../components/Listado";
import CineastaCard from "../components/card/CineastaCard";
import { Link } from "react-router-dom";

const Cineastas = () => {
  // Cambiar
  const nombre = "Cineasta de prueba";
  const fecha = "1992-06-21";
  const roles = ["Tester", "Productor", "Guionista"];
  const img = "https://via.placeholder.com/300";

  return (
    <>
      <Helmet>
        <title>Listado de cineastas</title>
      </Helmet>

      <Listado
        Titulo={
          <>
            <i className="fa-solid fa-film text-danger"></i>
            <span>Cineastas populares</span>
          </>
        }
        Card={Array.from({ length: 19 }).map((_, i) => (
          <CineastaCard
            key={i}
            Nombre={nombre}
            FechaNacimiento={fecha}
            Roles={roles}
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

export default Cineastas;
