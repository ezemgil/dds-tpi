import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Listado from "../components/Listado";
import CineastaCard from "../components/card/CineastaCard";
import { Link } from "react-router-dom";

import cineastaService from "../services/cineasta.service";

const Cineastas = () => {
  const [Cineastas, setCineastas] = useState([]);
  useEffect(() => {
    cineastaService.getAll().then((response) => {
      setCineastas(response.data);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        Card={Cineastas.map((cineasta) => (
          <CineastaCard
            key={cineasta.id}
            Id={cineasta.id}
            Nombre={`${cineasta.nombre} ${cineasta.apellido}`}
            FechaNacimiento={cineasta.fecha_nacimiento}
            Roles={cineasta.roles}
            Biografia={cineasta.biografia}
            Imagen={cineasta.imagen}
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
