import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import peliculaService from "../services/pelicula.service";

import ElencoPelicula from "../components/peliculas/ElencoPelicula";
import EncabezadoPelicula from "../components/peliculas/EncabezadoPelicula";
import Nominaciones from "../components/Nominaciones";

const DetallePelicula = () => {
  const { id } = useParams();
  const [Pelicula, setPelicula] = useState({});

  useEffect(() => {
    peliculaService.getById(id).then((response) => {
      console.log(response.data);
      console.log(response.data);
      setPelicula(response.data);
    });
  }, [id]);

  const nominaciones = [
    {
      id: 1,
      nombre: "Mejor película",
      ganador: false,
      fechaNominacion: "2024-06-21",
      academia: "Academia de pruebas unitarias",
      imagen: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      nombre: "Mejor director",
      ganador: true,
      fechaNominacion: "2024-06-21",
      academia: "Academia de pruebas unitarias",
      imagen: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      nombre: "Mejor guión",
      ganador: false,
      fechaNominacion: "2024-06-21",
      academia: "Academia de pruebas unitarias",
      imagen: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      nombre: "Mejor actor",
      ganador: false,
      fechaNominacion: "2024-06-21",
      academia: "Academia de pruebas unitarias",
      imagen: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      nombre: "Mejor actriz",
      ganador: false,
      fechaNominacion: "2024-06-21",
      academia: "Academia de pruebas unitarias",
      imagen: "https://via.placeholder.com/100",
    },
  ];

  const elenco = [
    {
      id: 1,
      nombre: "Tom",
      apellido: "Holland",
      fechaNacimiento: "1996-06-01",
      nacionalidad: {
        id: 1,
        nombre: "Estados Unidos",
      },
      rol: [
        {
          id: 1,
          nombre: "Actor",
        },
        {
          id: 2,
          nombre: "Productor",
        },
      ],

      imagen: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      nombre: "Zendaya",
      apellido: "Coleman",
      fechaNacimiento: "1996-09-01",
      nacionalidad: {
        id: 1,
        nombre: "Estados Unidos",
      },
      rol: [
        {
          id: 1,
          nombre: "Actriz",
        },
      ],
      imagen: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      nombre: "Marisa",
      apellido: "Tomei",
      fechaNacimiento: "1964-12-04",
      nacionalidad: {
        id: 1,
        nombre: "Estados Unidos",
      },
      rol: [
        {
          id: 1,
          nombre: "Actriz",
        },
        {
          id: 2,
          nombre: "Productor",
        },
        {
          id: 3,
          nombre: "Director",
        },
      ],
      imagen: "https://via.placeholder.com/300",
    },
  ];
  return (
    <>
      <Helmet>
        <title>{Pelicula.titulo || "Película sin título"}</title>
      </Helmet>

      <EncabezadoPelicula Pelicula={Pelicula} />
      <ElencoPelicula Elenco={elenco} />
      <Nominaciones Nominaciones={nominaciones} />
    </>
  );
};

export default DetallePelicula;
