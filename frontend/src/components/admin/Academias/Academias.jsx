import React, { useEffect, useState } from "react";
import academiaService from "../../../services/academia.service";

import AcademiasLista from "./AcademiasLista";

const Academias = () => {
  const [Academias, setAcademias] = useState([]);
  useEffect(() => {
    academiaService.getAll().then((response) => {
      setAcademias(response.data);
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
    <div className="container-fluid">
      <h2>Academias</h2>
      <AcademiasLista
        Academias={Academias}
        Ver={Ver}
        Editar={Editar}
        Eliminar={Eliminar}
      />
    </div>
  );
};

export default Academias;
