import React from "react";

const SectionTitle = ({ Titulo, Boton }) => {
  return (
    <div className="section-title d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-center align-items-center gap-2 fs-4">
        {Titulo}
      </div>
      <div className="flex-grow-1 mx-3">
        <hr className="my-0" />
      </div>
      {Boton}
    </div>
  );
};

export default SectionTitle;
