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
  const [totalGeneros, setTotalGeneros] = useState(0);
  const [Pagina, setPagina] = useState(0);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    BuscarPagina(Pagina);
  }, [Pagina]);

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
    if (AccionCRUD === "C") {
      await generoService.create(data);
    } else {
      await generoService.update(Genero.id, data);
    }
    getGeneros();
    setModalShow(false);
    setAccionCRUD("RA");
  }

  function Agregar() {
    setModalShow(true);
    setAccionCRUD("C");
    setGenero({
      nombre: "",
      activo: 0, // Por defecto el género se crea desactivado
    });
  }

  // Funcion para buscar una pagina
  async function BuscarPagina(_pagina) {
    const pageSize = 10;
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }

    try {
      const res = await generoService.getAll(_pagina, pageSize);
      if (res.generos) {
        setGeneros(res.generos);
        setTotalGeneros(res.totalGeneros);

        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalGeneros / pageSize); i++) {
          arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
      }
    } catch (error) {
      console.error("Error al buscar géneros:", error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Lista de géneros</title>
      </Helmet>
      <h1>Géneros cinematográficos</h1>
      <button
        className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
        onClick={() => {
          Agregar();
        }}
      >
        <i className="fa-solid fa-plus me-2"></i> Agregar género cinematográfico
      </button>

      <GenerosLista
        Generos={ListaGeneros}
        Editar={Editar}
        ActivarDesactivar={ActivarDesactivar}
        Pagina={Pagina}
        totalGeneros={totalGeneros}
        Paginas={Paginas}
        BuscarPagina={BuscarPagina}
      />

      {AccionCRUD === "C" && (
        <GenerosForm
          AccionCRUD={AccionCRUD}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setAccionCRUD("RA");
          }}
          Genero={Genero}
          Guardar={Guardar}
        />
      )}

      {AccionCRUD === "U" && (
        <GenerosForm
          AccionCRUD={AccionCRUD}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setAccionCRUD("RA");
          }}
          Genero={Genero}
          Editar={Editar}
          Guardar={Guardar}
          ActivarDesactivar={ActivarDesactivar}
        />
      )}
    </>
  );
};

export default Generos;
