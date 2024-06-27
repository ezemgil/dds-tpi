import React, { useState } from "react";
import { Helmet } from "react-helmet";

const PaisesLista = ({ Paises, Editar, Eliminar }) => {
    return (
        <>
            <Helmet>
                <title>Lista de Paises</title>
            </Helmet>

            <div className="row flex-nowrap">
                <div className="col py-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Codigo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Paises.map((pais) => (
                                    <tr key={pais.id}>
                                        <td>{pais.id}</td>
                                        <td>{pais.nombre}</td>
                                        <td>{pais.codigo}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn btn-warning btn-sm rounded-pill"
                                                onClick={() => Editar(pais.id)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm rounded-pill"
                                                onClick={() => Eliminar(pais.id)}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaisesLista;