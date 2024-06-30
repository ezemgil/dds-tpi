import React from "react";

const PremiosLista = ({ premios, Editar, Eliminar }) => {
    return (
        <div className="row flex-nowrap ">
            <div className="col py-3">
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {premios.length > 0 ? (
                                premios?.map((premio) => (
                                    <tr key={premio.id}>
                                        <td>{premio.id}</td>
                                        <td>{premio.nombre}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn btn-warning btn-sm rounded-pill"
                                                title="Editar premio"
                                                onClick={() => Editar(premio.id)}
                                            >
                                                <i className="fa-solid fa-pencil text-danger-emphasis"></i>
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm rounded-pill"
                                                title="Eliminar premio"
                                                onClick={() => Eliminar(premio.id)}
                                            >
                                                <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No hay premios</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PremiosLista;
