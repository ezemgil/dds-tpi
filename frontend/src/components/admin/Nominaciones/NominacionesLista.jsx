import React from "react";
import { Helmet } from "react-helmet";
import moment from "moment";

const NominacionesLista = ({ Nominaciones, Consultar, Pagina, totalNominaciones, Paginas, BuscarPagina }) => {
    return (
        <>
            <Helmet>
                <title>Lista de nominaciones</title>
            </Helmet>

            <div className="row flex-nowrap">
                <div className="col py-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Premio</th>
                                    <th>Película</th>
                                    <th>Fecha de nominación</th>
                                    <th>Fue ganador</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Nominaciones !== undefined && Nominaciones.length > 0 ? (
                                    Nominaciones.map((nominacion) => (
                                        <tr key={nominacion.id}>
                                            <td>{nominacion.id}</td>
                                            <td>{nominacion.premio.nombre}</td>
                                            <td>{nominacion.pelicula.titulo}</td>
                                            <td>{moment(nominacion.fecha_nominacion).format("L")}</td>
                                            <td>
                                                {(nominacion.fue_ganador === 0 && "No") ||
                                                    (nominacion.fue_ganador === 1 && "Si")}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No hay nominaciones</td>
                                    </tr>
                                )}
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
                                        <span className="pyBadge">Total: {totalNominaciones}</span>
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

export default NominacionesLista;
