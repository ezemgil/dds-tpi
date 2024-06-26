import React from "react";
import moment from "moment";

const NominacionCard = ({ Nominacion }) => {
  return (
    <div className="d-flex align-items-center justify-content-start gap-3">
      <div className="d-flex justify-content-start align-items-center gap-3">
        <img
          src={Nominacion.imagen}
          alt={Nominacion.nombre}
          className="img-fluid"
        />
        <div>
          <div className="d-flex gap-2 align-items-center">
            <span className="fs-6">
              <b>Año: </b>
              {moment(Nominacion.fechaNominacion).format("YYYY")}
            </span>
            {Nominacion.ganador ? (
              <span className="badge bg-warning-subtle border border-warning-subtle text-warning-emphasis rounded-pill    ">
                Ganador
              </span>
            ) : (
              <span className="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis rounded-pill">
                Nominado
              </span>
            )}
          </div>
          <h4 className="fs-4 card-title">{Nominacion.nombre}</h4>
          <span className="card-text">{Nominacion.academia}</span>
        </div>
      </div>
    </div>
  );
};

export default NominacionCard;
