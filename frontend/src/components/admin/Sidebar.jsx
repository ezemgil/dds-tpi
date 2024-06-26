import React from "react";
import Logo from "../../assets/img/logo/logo-01.svg";
import { Link } from "react-router-dom";

const Sidebar = ({ handleElementoActual }) => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/admin"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src={Logo}
            alt="logo"
            width="30"
            height="30"
            className="img-fluid me-2"
          />
          <span className="fs-4 d-none d-sm-inline">CineInfo</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <button
              onClick={() => handleElementoActual("Academias")}
              className="nav-link align-middle px-0 text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-building-columns"></i>
              <span className="ms-2 d-none d-sm-inline">Academias</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Generos")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-masks-theater"></i>
              <span className="ms-2 d-none d-sm-inline">Géneros</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Cineastas")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-clapperboard"></i>
              <span className="ms-2 d-none d-sm-inline">Cineastas</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Clasificaciones")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-clipboard-list"></i>
              <span className="ms-2 d-none d-sm-inline">Clasificaciones</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Idiomas")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-language"></i>
              <span className="ms-2 d-none d-sm-inline">Idiomas</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Nominaciones")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-trophy"></i>
              <span className="ms-2 d-none d-sm-inline">
                Nominaciones y premios
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Paises")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-earth-americas"></i>
              <span className="ms-2 d-none d-sm-inline">Países</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Peliculas")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-photo-film"></i>
              <span className="ms-2 d-none d-sm-inline">Películas</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleElementoActual("Usuarios")}
              className="nav-link px-0 align-middle text-white d-flex align-items-center"
            >
              <i className="fa-solid fa-users"></i>
              <span className="ms-2 d-none d-sm-inline">Usuarios</span>
            </button>
          </li>
        </ul>
        <Link
          to="/"
          className="btn btn-warning w-100 d-flex align-items-center justify-content-center text-white mt-4 text-decoration-none fw-bold py-2 border-0 bg-gradient bg-gradient-warning"
        >
          <i className="fa-solid fa-house"></i>
          <span className="ms-2 d-none d-sm-inline ">Inicio</span>
        </Link>
        <hr />
        <div className="dropdown mb-4 w-100 p-2 rounded">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/arcba.png"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1">Admin</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
``;
