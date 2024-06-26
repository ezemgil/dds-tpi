import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import peliculaService from "../services/pelicula.service";
import nominacionesService from "../services/nominaciones.service";

import ElencoPelicula from "../components/peliculas/ElencoPelicula";
import EncabezadoPelicula from "../components/peliculas/EncabezadoPelicula";
import Nominaciones from "../components/Nominaciones";

const DetallePelicula = () => {
  const { id } = useParams();
  const [Pelicula, setPelicula] = useState({});
  const [ItemsNominaciones, setItemsNominaciones] = useState([]);
  const [Elenco, setElenco] = useState([]);

  useEffect(() => {
    peliculaService.getById(id).then((response) => {
      setPelicula(response.data);
    });

    peliculaService.getElenco(id).then((response) => {
      setElenco(response.data);
    });

    nominacionesService.getByPeliculaId(id).then((response) => {
      setItemsNominaciones(response.data);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{Pelicula.titulo || "Película sin título"}</title>
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

      <EncabezadoPelicula Pelicula={Pelicula} />
      <ElencoPelicula Elenco={Elenco} />
      {ItemsNominaciones.length > 0 && (
        <Nominaciones Nominaciones={ItemsNominaciones} />
      )}
    </>
  );
};

export default DetallePelicula;
