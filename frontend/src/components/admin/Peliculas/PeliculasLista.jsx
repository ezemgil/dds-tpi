import React from "react";
import { Link } from "react-router-dom";


const PeliculasLista = ({ Peliculas, Editar, Eliminar }) => {

    

    return (
        <div className="row flex-nowrap ">
            <div className="col py-3">
                <div className="table-responsive">
                <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Calificacion</th>
                        <th>Duracion</th>
                        <th>Fecha Estreno</th>
                        <th>Acciones</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {Peliculas.length > 0 ? (
                        Peliculas?.map((Pelicula) => (
                            <tr key={Pelicula.id}>
                                <td>{Pelicula.id}</td>
                                <td>{Pelicula.titulo}</td>
                                <td>{Pelicula.calificacion}</td>
                                <td>{Pelicula.duracion}</td>
                                <td>{Pelicula.fecha_estreno}</td>
                                
                                <td className="d-flex gap-2 justify-content-center">
                                    <Link to={`/pelicula/${Pelicula.id}`}>
                                        <button className="btn btn-info btn-sm rounded-pill">
                                            <i className="fa-solid fa-eye text-primary-emphasis"></i>
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-warning btn-sm rounded-pill"
                                        onClick={() => Editar(Pelicula.id)}
                                    >
                                    <i className="fa-solid fa-pencil text-danger-emphasis"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm rounded-pill"
                                        onClick={() => Eliminar(Pelicula.id)}
                                    >
                                    <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )
                    : (<tr><td colSpan="6">No hay peliculas</td></tr>)}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default PeliculasLista;