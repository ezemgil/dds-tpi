import moment from "moment";
import React from "react";

const NominacionCard = ({ Nominacion }) => {
  return (
    <div className="d-flex align-items-center justify-content-start gap-3">
      <div className="d-flex justify-content-start align-items-center gap-3">
        <i
          class={
            "fa-solid fa-award fs-1 " +
            (Nominacion.fue_ganador === 0 ? "text-secondary" : "text-warning")
          }
        ></i>
        <div>
          <div className="d-flex gap-2 align-items-center">
            <span className="fs-6">
              <b>Año: </b>
              {moment(Nominacion.fecha_nominacion).format("YYYY")}
            </span>
            {Nominacion.fue_ganador ? (
              <span className="badge bg-warning-subtle border border-warning-subtle text-warning-emphasis rounded-pill    ">
                Ganador
              </span>
            ) : (
              <span className="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis rounded-pill">
                Nominado
              </span>
            )}
          </div>
          <h4 className="fs-4 card-title">{Nominacion.premio.nombre}</h4>
        </div>
      </div>
    </div>
  );
};

export default NominacionCard;
