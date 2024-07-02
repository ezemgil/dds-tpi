import React from "react";
import "../../assets/css/InicioAdmin.css";
import authService from "../../services/auth.service";
import { Helmet } from "react-helmet";

const InicioAdmin = () => {
    // Función para obtener el nombre del usuario logueado
    const nombreUsuario = authService.getUsuarioLogueado();

    // Función para hacer la primera letra mayúscula
    const formatNombreUsuario = (nombre) => {
        if (!nombre) return "";
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    };

    return (
        <>
            <Helmet>
                <title>Panel de administrador</title>
            </Helmet>
            <div className="container h-100">
                <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="text-center my-4">
                        <h1 className="display-4">
                            ¡Bienvenido, <span className="text-warning">{formatNombreUsuario(nombreUsuario)}</span>!
                        </h1>
                        <p className="lead">
                            ¡Nos alegra verte de nuevo! Aquí puedes acceder a todas las herramientas y configuraciones
                            administrativas de CineInfo.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="fs-6 text-white fw-bold">
                                A continuación, una lista de botones que encontrarás en las tablas del panel para
                                administrador:
                            </h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-unstyled inicio-admin-paragraph">
                                        <li className="my-2 d-flex align-items-center">
                                            <button className="btn btn-info btn-sm rounded-pill me-2">
                                                <i className="fa-solid fa-eye text-primary-emphasis"></i>
                                            </button>
                                            <span>Consultar el elemento</span>
                                        </li>
                                        <li className="my-2 d-flex align-items-center">
                                            <button className="btn btn-warning btn-sm rounded-pill me-2">
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <span>Editar el elemento</span>
                                        </li>
                                        <li className="my-2 d-flex align-items-center">
                                            <button className="btn btn-danger btn-sm rounded-pill me-2">
                                                <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
                                            </button>
                                            <span>Eliminar el elemento</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-unstyled inicio-admin-paragraph">
                                        <li className="my-2 d-flex align-items-center">
                                            <button className="btn btn-danger btn-sm rounded-pill me-2">
                                                <i className="fa-solid fa-circle-xmark"></i>
                                            </button>
                                            <span>Activar o desactivar el elemento</span>
                                        </li>
                                        <li className="my-2 d-flex align-items-center">
                                            <button className="btn badge btn-dark border-secondary text-light btn-sm rounded-pill me-2 btn-custom-light">
                                                <i className="fa-solid fa-user-plus"></i>
                                            </button>
                                            <span>Añadir rol de un cineasta</span>
                                        </li>
                                        <li className="my-2 d-flex align-items-center">
                                            <button className="btn btn-sm btn-success text-dark rounded-pill me-2">
                                                <i className="fa-solid fa-trophy shadow"></i>
                                            </button>
                                            <span>Añadir una nominación</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InicioAdmin;
