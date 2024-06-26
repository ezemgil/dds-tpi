import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import cineastaService from "../services/cineasta.service";

import EncabezadoCineasta from "../components/cineastas/EncabezadoCineasta";
import ParticipacionesCineasta from "../components/cineastas/ParticipacionesCineasta";

const DetalleCineasta = () => {
  const { id } = useParams();
  const [Cineasta, setCineasta] = useState({});
  const [Participaciones, setParticipaciones] = useState([]);

  useEffect(() => {
    cineastaService.getById(id).then((response) => {
      setCineasta(response.data);
    });

    cineastaService.getParticipaciones(id).then((response) => {
      setParticipaciones(response.data);
      console.log(response.data);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{`${Cineasta.nombre} ${Cineasta.apellido}`}</title>
      </Helmet>

      <div className="container">
        <button
          className="btn btn-warning mt-3 float-end"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>

      <EncabezadoCineasta Cineasta={Cineasta} />
      <ParticipacionesCineasta Peliculas={Participaciones} />
    </>
  );
};

export default DetalleCineasta;
