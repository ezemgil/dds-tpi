import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import generoService from "../../../services/genero.service";

import GenerosLista from "./GenerosLista";
import GenerosForm from "./GenerosForm";

const Generos = () => {
  const [ListaGeneros, setGeneros] = useState([]);
  const [Genero, setGenero] = useState({});
  const [AccionCRUD, setAccionCRUD] = useState("RA");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getGeneros();
  }, []);

  async function getGeneros() {
    const response = await generoService.getAll();
    setGeneros(response.data);
  }

  async function findGeneroById(id, AccionCRUD) {
    const response = await generoService.getById(id);
    setGenero(response.data);
    setAccionCRUD(AccionCRUD);
  }

  function Editar(id) {
    setModalShow(true);
    findGeneroById(id, "U");
  }

  async function ActivarDesactivar(Genero) {
    await generoService.update(Genero.id, { activo: Genero.activo ? 0 : 1 });
    getGeneros();
  }

  async function Guardar(data) {
    console.log(data);
  }

  function Volver() {
    setModalShow(false);
    setGenero({});
  }

  return (
    <>
      <Helmet>
        <title>Lista de géneros</title>
      </Helmet>
      <h2>Generos</h2>

      <GenerosLista
        Generos={ListaGeneros}
        Editar={Editar}
        ActivarDesactivar={ActivarDesactivar}
      />

      {AccionCRUD === "U" && (
        <GenerosForm
          show={modalShow}
          onHide={Volver}
          Volver={Volver}
          Genero={Genero}
          Editar={Editar}
          ActivarDesactivar={ActivarDesactivar}
        />
      )}
    </>
  );
};

export default Generos;
