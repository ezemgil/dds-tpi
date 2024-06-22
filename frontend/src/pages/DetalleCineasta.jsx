import React from "react";
import { Helmet } from "react-helmet";

import EncabezadoCineasta from "../components/cineastas/EncabezadoCineasta";
import ParticipacionesCineasta from "../components/cineastas/ParticipacionesCineasta";
import Nominaciones from "../components/Nominaciones";

const DetalleCineasta = () => {
  const cineasta = {
    id: 1,
    nombre: "Agustín",
    apellido: "Gutiérrez Ioime",
    fechaNacimiento: "2002-09-30",
    nacionalidad: [
      {
        id: 1,
        nombre: "Argentina",
        codigo: "AR",
      },
      {
        id: 2,
        nombre: "Perú",
        codigo: "PE",
      },
    ],
    roles: [
      {
        id: 1,
        nombre: "Miren a",
      },
      {
        id: 2,
        nombre: "mi hermano",
      },
      {
        id: 3,
        nombre: "programador",
      },
    ],
    biografia:
      "Estudiante de Ingeniería en Sistemas de Información\n Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum ab fugit, quas in veniam eaque!",
    participaciones: [
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
    ],
  };
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

  return (
    <>
      <Helmet>
        <title>{`${cineasta.nombre} ${cineasta.apellido}`}</title>
      </Helmet>
      <EncabezadoCineasta Cineasta={cineasta} />
      <ParticipacionesCineasta Peliculas={cineasta.participaciones} />
      <Nominaciones Nominaciones={nomin.peliculas} />
    </>
  );
};

export default DetalleCineasta;
