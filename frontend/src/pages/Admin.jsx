import React, { useState } from "react";

import Sidebar from "../components/admin/Sidebar";

import Clasificaciones from "../components/admin/Clasificaciones/Clasificaciones";
import Generos from "../components/admin/Generos/Generos";
import Peliculas from "../components/admin/Peliculas/Peliculas";
import Cineastas from "../components/admin/Cineastas/Cineastas";
import Idiomas from "../components/admin/Idiomas/Idiomas";
import Paises from "../components/admin/Paises/Paises";
import Nominaciones from "../components/admin/Nominaciones/Nominaciones";

const Admin = () => {
  const [ElementoActual, setElementoActual] = useState("Peliculas");
  
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar handleElementoActual={setElementoActual} />
          <div className="col py-3">
            {ElementoActual === "Generos" && <Generos />}
            {ElementoActual === "Peliculas" && <Peliculas />}
            {ElementoActual === "Clasificaciones" && <Clasificaciones />}
            {ElementoActual === "Cineastas" && <Cineastas />}
            {ElementoActual === "Idiomas" && <Idiomas />}
            {ElementoActual === "Paises" && <Paises />}
            {ElementoActual === "Nominaciones" && <Nominaciones />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
