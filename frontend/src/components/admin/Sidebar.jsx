import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo/logo-01.svg";

import authService from "../../services/auth.service";

const Sidebar = ({ handleElementoActual }) => {
    return (
        <div className="col-auto col-md-3 col-xl-2 px-0 bg-dark sidebar-bordered-right">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 sticky-top">
                <button
                    onClick={() => handleElementoActual("InicioAdmin")}
                    className="d-flex align-items-center py-4 mb-md-0 me-md-auto text-white text-decoration-none logo-container bg-dark border-0 w-100"
                    title="Inicio"
                >
                    <img src={Logo} alt="logo" className="img-fluid logo-img" />
                    <span className="d-none d-sm-inline logo-text">CineInfo</span>
                </button>
                <ul
                    className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                    id="menu"
                >
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("InicioAdmin")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-user-circle"></i>
                            <span className="ms-2 d-none d-sm-inline">Inicio</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Generos")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-masks-theater"></i>
                            <span className="ms-2 d-none d-sm-inline">Géneros</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Cineastas")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-clapperboard"></i>
                            <span className="ms-2 d-none d-sm-inline">Cineastas</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Clasificaciones")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-clipboard-list"></i>
                            <span className="ms-2 d-none d-sm-inline">Clasificaciones</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Idiomas")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-language"></i>
                            <span className="ms-2 d-none d-sm-inline">Idiomas</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Nominaciones")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-trophy"></i>
                            <span className="ms-2 d-none d-sm-inline">Nominaciones</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Paises")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-earth-americas"></i>
                            <span className="ms-2 d-none d-sm-inline">Países</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Peliculas")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-photo-film"></i>
                            <span className="ms-2 d-none d-sm-inline">Películas</span>
                        </button>
                    </li>
                    <li className="nav-item sidebar-item w-100">
                        <button
                            onClick={() => handleElementoActual("Premios")}
                            className="nav-link px-0 align-middle text-white d-flex align-items-center w-100"
                        >
                            <i className="fa-solid fa-award"></i>
                            <span className="ms-2 d-none d-sm-inline">Premios</span>
                        </button>
                    </li>
                </ul>
                <Link
                    to="/"
                    className="btn btn-warning w-100 d-flex align-items-center justify-content-center text-white mt-4 text-decoration-none fw-bold py-2 border-0 bg-gradient"
                    title="Volver al inicio"
                >
                    <i className="fa-solid fa-house"></i>
                    <span className="ms-2 d-none d-sm-inline">Inicio</span>
                </Link>
                <Link
                    onClick={authService.logout}
                    to="/inicio"
                    className="btn btn-danger w-100 d-flex align-items-center justify-content-center text-white mt-4 text-decoration-none fw-bold py-2 border-0 bg-gradient"
                    title="Cerrar sesión"
                >
                    <i className="fa-solid fa-sign-out"></i>
                    <span className="ms-2 d-none d-sm-inline">Cerrar sesión</span>
                </Link>
                <hr />
            </div>
        </div>
    );
};

export default Sidebar;
