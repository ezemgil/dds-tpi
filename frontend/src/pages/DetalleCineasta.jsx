import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import cineastaService from "../services/cineasta.service";

import EncabezadoCineasta from "../components/cineastas/EncabezadoCineasta";
import ParticipacionesCineasta from "../components/cineastas/ParticipacionesCineasta";
import Nominaciones from "../components/Nominaciones";

const DetalleCineasta = () => {
  const { id } = useParams();
  const [Cineasta, setCineasta] = useState({});

  useEffect(() => {
    cineastaService.getById(id).then((response) => {
      setCineasta(response.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [id]);

  const nomin = {
    peliculas: [
      {
        id: 1,
        nombre: "El secreto de sus tests",
        imagen: "https://via.placeholder.com/100",
        academia: "Premios Oscar",
        fechaNominacion: "2024-06-21",
        ganador: true,
      },
      {
        id: 2,
        nombre: "Apurate Harry que en la matanza hacen 2x1",
        imagen: "https://via.placeholder.com/100",
        academia: "Premios Oscar",
        fechaNominacion: "2024-06-21",
        ganador: false,
      },
    ],
  };

  const participaciones = [
    {
      titulo: "El secreto de sus tests",
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellendus beatae atque tenetur at facere porro excepturi unde adipisci dolores quo id natus voluptatibus ut, autem distinctio alias sapiente fugiat esse quia sit est. Quae aliquam hic deserunt tenetur dicta repellendus, iste cum exercitationem ex minima laborum dolorem soluta corporis!",
      duracion: 69,
      fechaEstreno: "2024-06-21",
      tituloOriginal: "The secret of their tests",
      clasificacion: {
        nombre: "NC-17",
        descripcion: "Restringida",
      },
      generos: ["Test", "Pruebas unitarias", "Pruebas de integración"],
      calificacion: 8.9,
      imagen: "https://via.placeholder.com/100",
    },
    {
      titulo: "Apurate Harry que en la matanza hacen 2x1",
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellendus beatae atque tenetur at facere porro excepturi unde adipisci dolores quo id natus voluptatibus ut, autem distinctio alias sapiente fugiat esse quia sit est. Quae aliquam hic deserunt tenetur dicta repellendus, iste cum exercitationem ex minima laborum dolorem soluta corporis!",
      duracion: 69,
      fechaEstreno: "2024-06-21",
      tituloOriginal: "Hurry up Harry that in the slaughter they make 2x1",
      clasificacion: {
        nombre: "NC-17",
        descripcion: "Restringida",
      },
      generos: ["Test", "Pruebas unitarias", "Pruebas de integración"],
      calificacion: 8.9,
      imagen: "https://via.placeholder.com/100",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${Cineasta.nombre} ${Cineasta.apellido}`}</title>
      </Helmet>

      {/* Botón de volver */}
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
      <ParticipacionesCineasta Peliculas={participaciones} />
      <Nominaciones Nominaciones={nomin.peliculas} />
    </>
  );
};

export default DetalleCineasta;
