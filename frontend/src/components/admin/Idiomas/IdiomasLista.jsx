import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";

const IdiomasLista = ({ Idiomas, Editar, Eliminar }) => {
    return (
        <>
            <Helmet>
                <title>Lista de Idiomas</title>
            </Helmet>

            <div className="row flex-nowrap">
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
                                {Idiomas.map((idioma) => (
                                    <tr key={idioma.id}>
                                        <td>{idioma.id}</td>
                                        <td>{idioma.nombre}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => Editar(idioma.id)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => Eliminar(idioma.id)}
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

export default IdiomasLista;
