import React, { useState } from "react";

import Sidebar from "../components/admin/Sidebar";

import Academias from "../components/admin/Academias/Academias";
import Generos from "../components/admin/Generos/Generos";
import Cineastas from "../components/admin/Cineastas/Cineastas";
import Idiomas from "../components/admin/Idiomas/Idiomas";
import Paises from "../components/admin/Paises/Paises";

const Admin = () => {
  const [ElementoActual, setElementoActual] = useState("Academias");

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar handleElementoActual={setElementoActual} />
          <div className="col py-3">
            {ElementoActual === "Academias" && <Academias />}
            {ElementoActual === "Generos" && <Generos />}
            {ElementoActual === "Cineastas" && <Cineastas />}
            {ElementoActual === "Idiomas" && <Idiomas />}
            {ElementoActual === "Paises" && <Paises />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
