import React from "react";
import moment from "moment";

const EncabezadoPelicula = ({ Pelicula }) => {
  const clasificacionColor = {
    G: "success",
    PG: "info",
    "PG-13": "warning",
    R: "danger",
    "NC-17": "dark",
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-5 mb-4 mb-lg-0">
          <img
            src="https://via.placeholder.com/500"
            alt="Póster de la película"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <span className="fw-bold mb-1 fs-1">{Pelicula.titulo}</span>
              <span
                className={
                  "badge bg-" +
                  clasificacionColor[Pelicula?.clasificacion?.nombre] +
                  " fs-4 me-2"
                }
              >
                {Pelicula?.clasificacion?.nombre}
              </span>
            </div>
            <div className="d-flex align-items-center gap-1 fs-3">
              <span className="text-warning">{Pelicula.calificacion}</span>
              <i className="fa-solid fa-star text-warning me-2"></i>
            </div>
          </div>
          <p className="">{Pelicula.descripcion}</p>
          <div className="mb-3">
            <div className="fs-5 text-light fs-4">
              <i className="fa-solid fa-circle-info me-2"></i>
              <span>Información de la película</span>
            </div>
            <ul className="list-group">
              <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                <b>Título original:</b> {Pelicula.titulo_original}
              </li>
              <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                <b>Duración:</b> {Pelicula.duracion} minutos
              </li>
              <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                <b>Fecha de estreno:</b>{" "}
                {moment(Pelicula.fechaEstreno).format("L")}
              </li>
              <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                <b>Calificación:</b> {Pelicula?.clasificacion?.nombre}{" "}
                {"(" + Pelicula?.clasificacion?.descripcion + ")"}
              </li>
            </ul>
          </div>
          <div>
            <div className=" d-flex align-items-center mb-2 fs-4 gap-2">
              <i className="fa-solid fa-masks-theater text-light"></i>
              <span>Géneros</span>
            </div>
            <div className="d-flex flex-wrap gap-2 fs-5">
              {Pelicula?.generos?.length > 0 &&
                Pelicula.generos.map((genero, i) => (
                  <span
                    key={i}
                    className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill"
                  >
                    {genero.nombre}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncabezadoPelicula;
