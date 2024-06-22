import React from "react";
import Placeholder from "../../assets/img/placeholder.webp";
import { Link } from "react-router-dom";

const Encabezado = () => {
  return (
    <div className="container col-xxl-8 px-4 py-3">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={Placeholder}
            className="d-block mx-lg-auto img-fluid rounded"
            alt="CineInfo"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h2>Obtén información acerca de tu</h2>
          <h1 className="display-5 fw-bold text-white lh-1 mb-3">
            Película, actores y directores favoritos
          </h1>
          <p className="lead lh-1 fw-light text-white-50 mb-4 text-justify">
            Con <b>CineInfo</b> podrás obtener información acerca de tus
            películas, actores y directores favoritos. Además, podrás ver las
            películas más populares y las más recientes.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start col-12">
            <Link
              to="/peliculas"
              className="btn btn-primary text-dark btn-lg px-4 me-md-2 col-md-6"
            >
              Explorar películas
            </Link>
            <Link
              to="/acerca-de"
              className="btn btn-outline-secondary btn-lg px-4 col-md-6"
            >
              Conocer más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encabezado;
