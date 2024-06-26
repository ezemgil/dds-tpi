import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";

const IdiomasLista = ({ Idiomas, Editar, ActivarDesactivar, Pagina, totalIdiomas, Paginas, BuscarPagina }) => {
    return (
        <>
            <Helmet>
                <title>Lista de idiomas</title>
            </Helmet>

            <div className="row flex-nowrap">
                <div className="col py-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Activo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Idiomas !== undefined ? (
                                    Idiomas.map((idioma) => (
                                        <tr key={idioma.id}>
                                            <td>{idioma.id}</td>
                                            <td>{idioma.nombre}</td>
                                            <td>{idioma.activo ? "Sí" : "No"}</td>
                                            <td className="d-flex gap-2 justify-content-center">
                                                <button
                                                    className="btn btn-warning btn-sm rounded-pill"
                                                    onClick={() => Editar(idioma.id)}
                                                    title="Editar"
                                                >
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                                {idioma.activo ? (
                                                    <button
                                                        className="btn btn-danger btn-sm rounded-pill"
                                                        onClick={() => ActivarDesactivar(idioma)}
                                                        title="Desactivar"
                                                    >
                                                        <i className="fa-solid fa-circle-xmark"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-success btn-sm rounded-pill"
                                                        onClick={() => ActivarDesactivar(idioma)}
                                                        title="Activar"
                                                    >
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No hay idiomas</td>
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
                                        <span className="pyBadge">Total: {totalIdiomas}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IdiomasLista;
