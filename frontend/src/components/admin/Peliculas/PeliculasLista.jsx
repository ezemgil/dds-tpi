import React from "react";
import { Link } from "react-router-dom";

const PeliculasLista = ({
    Peliculas,
    Editar,
    Eliminar,
    EditarNominaciones,
    EditarElenco,
    BuscarPagina,
    Paginas,
    totalPeliculas,
    Pagina,
}) => {
    return (
        <div className="row flex-nowrap ">
            <div className="col py-3">
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Título</th>
                                <th>Calificación</th>
                                <th>Duración</th>
                                <th>Fecha de estreno</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Peliculas !== undefined || Peliculas?.length > 0 ? (
                                Peliculas?.map((Pelicula) => (
                                    <tr key={Pelicula.id}>
                                        <td>{Pelicula.id}</td>
                                        <td>{Pelicula.titulo}</td>
                                        <td>{Pelicula.calificacion}</td>
                                        <td>{Pelicula.duracion}</td>
                                        <td>{Pelicula.fecha_estreno}</td>

                                        <td className="d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn badge btn-dark border-secondary text-light btn-sm rounded-pill btn-custom-light"
                                                onClick={() => EditarElenco(Pelicula.id)}
                                                title="Editar elenco"
                                            >
                                                <i className="fa-solid fa-user-plus"></i>
                                            </button>

                                            <button
                                                className="btn btn-sm btn-success text-dark  rounded-pill"
                                                onClick={() => EditarNominaciones(Pelicula.id)}
                                                title="Editar nominaciones"
                                            >
                                                <i className="shadow fa-solid fa-trophy"></i>
                                            </button>

                                            <Link to={`/pelicula/${Pelicula.id}`}>
                                                <button className="btn btn-info btn-sm rounded-pill" title="Ver">
                                                    <i className="fa-solid fa-eye text-primary-emphasis"></i>
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-warning btn-sm rounded-pill"
                                                onClick={() => Editar(Pelicula.id)}
                                                title="Editar"
                                            >
                                                <i className="fa-solid fa-pencil text-danger-emphasis"></i>
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm rounded-pill"
                                                onClick={() => Eliminar(Pelicula.id)}
                                                title="Eliminar"
                                            >
                                                <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No hay peliculas</td>
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
                                    <span className="pyBadge">Total: {totalPeliculas}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeliculasLista;
