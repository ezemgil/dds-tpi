import React from "react";
import { NavLink } from "react-router-dom";
import authService from "../../services/auth.service";

import Logo from "../../assets/img/logo/logo-01.svg";

import peliculaService from "../../services/pelicula.service";

const Navbar = () => {
  const usuario = authService.getUsuarioLogueado();

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

          {usuario === "admin" ? (
            <>
              <NavLink className="btn btn-info text-nowrap" to="/admin">
                Panel de administración{" "}
                <i class="fa-solid fa-screwdriver-wrench"></i>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="btn btn-warning text-nowrap" to="/login">
                Iniciar sesión
              </NavLink>
            </>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
