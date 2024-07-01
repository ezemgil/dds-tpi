import React from "react";
import "../../assets/css/InicioAdmin.css";
import authService from "../../services/auth.service";

const InicioAdmin = () => {
    // Función para obtener el nombre del usuario logueado
    const nombreUsuario = authService.getUsuarioLogueado();

    // Función para hacer la primera letra mayúscula
    const formatNombreUsuario = (nombre) => {
        if (!nombre) return "";
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    };

    return (
        <div class="container">
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div class="text-center my-4">
                    <h1 class="display-4">
                        ¡Bienvenido, <span className="text-warning">{formatNombreUsuario(nombreUsuario)}</span>!
                    </h1>
                    <p class="lead">
                        ¡Nos alegra verte de nuevo! Aquí puedes acceder a todas las herramientas y configuraciones
                        administrativas de CineInfo.
                    </p>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h2 class="fs-6 text-white fw-bold">
                            A continuación, una lista de botones que encontrarás en las tablas del panel para
                            administrador:
                        </h2>
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="list-unstyled inicio-admin-paragraph">
                                    <li class="my-2 d-flex align-items-center">
                                        <button class="btn btn-info btn-sm rounded-pill me-2">
                                            <i class="fa-solid fa-eye text-primary-emphasis"></i>
                                        </button>
                                        <span>Consultar el elemento</span>
                                    </li>
                                    <li class="my-2 d-flex align-items-center">
                                        <button class="btn btn-warning btn-sm rounded-pill me-2">
                                            <i class="fa-solid fa-pencil"></i>
                                        </button>
                                        <span>Editar el elemento</span>
                                    </li>
                                    <li class="my-2 d-flex align-items-center">
                                        <button class="btn btn-danger btn-sm rounded-pill me-2">
                                            <i class="fa-solid fa-trash-can text-danger-emphasis"></i>
                                        </button>
                                        <span>Eliminar el elemento</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="list-unstyled inicio-admin-paragraph">
                                    <li class="my-2 d-flex align-items-center">
                                        <button class="btn btn-danger btn-sm rounded-pill me-2">
                                            <i class="fa-solid fa-circle-xmark"></i>
                                        </button>
                                        <span>Activar o desactivar el elemento</span>
                                    </li>
                                    <li class="my-2 d-flex align-items-center">
                                        <button class="btn badge btn-dark border-secondary text-light btn-sm rounded-pill me-2 btn-custom-light">
                                            <i class="fa-solid fa-user-plus"></i>
                                        </button>
                                        <span>Añadir rol de un cineasta</span>
                                    </li>
                                    <li class="my-2 d-flex align-items-center">
                                        <button class="btn btn-sm btn-success text-dark rounded-pill me-2">
                                            <i class="fa-solid fa-trophy shadow"></i>
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
    );
};

export default InicioAdmin;
