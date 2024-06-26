import React from "react";
import moment from "moment";

const EncabezadoCineasta = ({ Cineasta }) => {
  return (
    <>
      <div className="container my-4">
        {console.log(Cineasta)}
        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img
              src="https://via.placeholder.com/500"
              alt={`Foto de ${Cineasta?.nombre} ${Cineasta?.apellido}`}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-lg-7">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3 align-items-center">
                <span className="fw-bold mb-1 fs-1">{`${Cineasta?.nombre} ${Cineasta?.apellido}`}</span>
              </div>
              <div className="d-flex align-items-center gap-1 fs-3">
                <span
                  className={`flag flag-${Cineasta?.pais?.codigo?.toLowerCase()}`}
                ></span>
                {Cineasta.pais2 !== null ? (
                  <span
                    className={`flag flag-${Cineasta?.pais2?.codigo.toLowerCase()}`}
                  ></span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-1 fs-5">
              {Cineasta?.roles?.map((rol) => (
                <span
                  key={rol.id}
                  className="badge bg-warning-subtle border border-warning-subtle text-warning-emphasis rounded-pill me-1"
                >
                  {rol.nombre}
                </span>
              ))}
            </div>
            <div className="my-2">
              <p className="">{Cineasta?.biografia || "Sin bibliografía"}</p>
            </div>
            <div className="mb-3">
              <div className="fs-5 text-light">
                <i className="fa-solid fa-circle-info me-2"></i>
                <span>Información del Cineasta</span>
              </div>
              <ul className="list-group">
                <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                  <b>Nombre Completo:</b>{" "}
                  {`${Cineasta.nombre} ${Cineasta.apellido}`}
                </li>
                <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                  <b>Fecha de Nacimiento:</b>{" "}
                  {moment(Cineasta.fecha_nacimiento).format("L")}
                </li>
                {Cineasta.fecha_fallecimiento && (
                  <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                    <b>Fecha de Fallecimiento:</b>{" "}
                    {moment(Cineasta.fecha_fallecimiento).format("L")}
                  </li>
                )}
                <li className="list-group-item bg-body-subtle text-secondary-emphasis">
                  {Cineasta.pais2 === null ? (
                    <>
                      <b>Nacionalidad:</b> {Cineasta?.pais?.nombre}
                    </>
                  ) : (
                    <>
                      <b>Nacionalidades:</b>{" "}
                      {Cineasta?.pais?.nombre + ", " + Cineasta?.pais2?.nombre}
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EncabezadoCineasta;
