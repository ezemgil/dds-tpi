import moment from "moment";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const CineastasLista = ({ cineastas, editar, eliminar, Pagina, totalCineastas, Paginas, BuscarPagina }) => {
    return (
        <>
            <Helmet>
                <title>Lista de cineastas</title>
            </Helmet>

            <div className="row flex-nowrap">
                <div className="col py-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha de nacimiento</th>
                                    <th>Fecha de fallecimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cineastas.map((cineasta) => (
                                    <tr key={cineasta.id}>
                                        <td>{cineasta.id}</td>
                                        <td>{cineasta.nombre}</td>
                                        <td>{cineasta.apellido}</td>
                                        <td>{moment(cineasta.fecha_nacimiento).format("L")}</td>
                                        <td>
                                            {cineasta.fecha_fallecimiento &&
                                                moment(cineasta.fecha_fallecimiento).format("L")}
                                        </td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <Link to={`/cineasta/${cineasta.id}`}>
                                                <button className="btn btn-info btn-sm rounded-pill" title="Ver">
                                                    <i className="fa-solid fa-eye text-primary-emphasis"></i>
                                                </button>
                                            </Link>
                                            <button
                                                className="btn btn-warning btn-sm rounded-pill"
                                                onClick={() => editar(cineasta.id)}
                                                title="Editar"
                                            >
                                                <i className="fa-solid fa-pencil text-danger-emphasis"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm rounded-pill"
                                                onClick={() => eliminar(cineasta.id)}
                                                title="Eliminar"
                                            >
                                                <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Paginacion */}
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
                                        <span className="pyBadge">Total: {totalCineastas}</span>
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

export default CineastasLista;
