import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import generoService from "../../../services/genero.service";


import GenerosLista from "./GenerosLista";

const Generos = () => {
  const [ListaGeneros, setGeneros] = useState([]);
  useEffect(() => {
    generoService.getAll().then((response) => {
      setGeneros(response.data);
    });
  }, []);

  function Ver() {
    console.log("Ver");
  }

  function Editar() {
    console.log("Editar");
  }

  function Eliminar() {
    console.log("Eliminar");
  }

  return (
    <>
      <Helmet>
        <title>Lista de géneros</title>
      </Helmet>
      <h2>Generos</h2>
      <GenerosLista Generos={ListaGeneros}/>
    </>
  );
};

export default Generos;
