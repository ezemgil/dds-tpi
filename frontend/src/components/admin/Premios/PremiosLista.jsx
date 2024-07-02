import React from "react";

const PremiosLista = ({ Premios, Editar, Eliminar, Paginas, Pagina, totalPremios, BuscarPagina }) => {
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
                            {Premios?.length > 0 ? (
                                Premios.filter((Premio) => Premio?.id !== 0).map((Premio) => (
                                    <tr key={Premio.id}>
                                        <td>{Premio.id}</td>
                                        <td>{Premio.nombre}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn btn-warning btn-sm rounded-pill"
                                                title="Editar premio"
                                                onClick={() => Editar(Premio.id)}
                                            >
                                                <i className="fa-solid fa-pencil text-danger-emphasis"></i>
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm rounded-pill"
                                                title="Eliminar premio"
                                                onClick={() => Eliminar(Premio.id)}
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

                    {/* Paginador */}
                    <div className="paginador">
                        <div className="row align-items-center d-flex justify-content-center">
                            <div style={{ display: "flex", marginRight: "auto" }} className="col text-center">
                                Página: &nbsp;
                                <select
                                    className="form-select"
                                    value={Pagina}
                                    onChange={(e) => {
                                        BuscarPagina(e.target.value);
                                    }}
                                >
                                    {Paginas.map((pagina) => (
                                        <option key={pagina} value={pagina}>
                                            {pagina + 1}
                                        </option>
                                    ))}
                                </select>
                                &nbsp; de {Paginas.length}
                                <span style={{ marginLeft: "auto" }}>
                                    <span className="pyBadge">Total: {totalPremios}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiosLista;
