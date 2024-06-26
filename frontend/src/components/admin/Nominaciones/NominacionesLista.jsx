import React from "react";
import { Helmet } from "react-helmet";
import moment from "moment";

const NominacionesLista = ({ Nominaciones, Consultar, Editar, Eliminar }) => {
    return (
        <>
            <Helmet>
                <title>Lista de Nominaciones</title>
            </Helmet>

            <div className="row flex-nowrap">
                <div className="col py-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Premio</th>
                                    <th>Pelicula</th>
                                    <th>Fecha de nominacion</th>
                                    <th>Fue ganador</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Nominaciones.map((nominacion) => (
                                    <tr key={nominacion.id}>
                                        <td>{nominacion.id}</td>
                                        <td>{nominacion.premio.nombre}</td>
                                        <td>{nominacion.pelicula.titulo}</td> 
                                        <td>{moment(nominacion.fecha_nominacion).format("L")}</td>
                                        <td>{nominacion.fue_ganador === 0 && "No" || nominacion.fue_ganador === 1 && "Si"}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                title="Consultar"
                                                onClick={() => Consultar(nominacion.id)}
                                            >
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => Editar(nominacion.id)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => Eliminar(nominacion.id)}
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

export default NominacionesLista;