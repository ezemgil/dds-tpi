import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Listado from "../components/Listado";
import CineastaCard from "../components/card/CineastaCard";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

import cineastaService from "../services/cineasta.service";

const Cineastas = () => {
  const [Cineastas, setCineastas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  async function buscar() {
    const response = await cineastaService.getByName(busqueda);
    setCineastas(response.data);
  }

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

      <div className="container mt-4">
        <SearchBar
          Placeholder="Buscar cineastas..."
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          buscar={buscar}
        />
      </div>

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
            FechaFallecimiento={cineasta.fecha_fallecimiento}
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
