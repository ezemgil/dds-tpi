import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/img/logo/logo-01.svg";

import peliculaService from "../../services/pelicula.service";

const Navbar = () => {
  const handleClick = async () => {
    const peliculas = await peliculaService.getNu();
    console.log(peliculas);
  };
  return (
    <nav className="px-3 navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand d-flex align-items-center" to="/inicio">
        <img src={Logo} alt="CineInfo" width="32" height="32"></img>
        <span className="ms-2">CineInfo</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/peliculas">
              Películas
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/cineastas">
              Cineastas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/acerca-de">
              Acerca de
            </NavLink>
          </li>
        </ul>
        <form className="d-flex align-items-center">
          <div className="input-group me-3">
            <input
              type="text"
              className="form-control bg-dark text-white placeholder-light"
              placeholder="Buscar película..."
              aria-label="Buscar película"
              aria-describedby="button-addon2"
            ></input>
            <button
              className="btn btn-warning"
              type="button"
              id="button-addon2"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          {/* Si el usuario no está logueado: */}
          <NavLink className="btn btn-warning text-nowrap" to="/login">
            Iniciar sesión
          </NavLink>
          {/* Si el usuario está logueado: */}
          {/* <div className="dropdown">
            <NavLink
              to="/"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/arcba.png"
                alt="profile"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </NavLink>
            <ul className="dropdown-menu dropdown-menu-end text-small">
              <li>
                <NavLink className="dropdown-item" to="/">
                  Nuevo...
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/profile">
                  Perfil
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <NavLink className="dropdown-item" to="/logout">
                  Cerrar sesión
                </NavLink>
              </li>
            </ul>
          </div> */}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
