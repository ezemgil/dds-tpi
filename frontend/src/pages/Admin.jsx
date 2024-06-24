import React, { useState } from "react";

import Sidebar from "../components/admin/Sidebar";

import Academias from "../components/admin/Academias/Academias";
import Generos from "../components/admin/Generos/Generos";

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
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
