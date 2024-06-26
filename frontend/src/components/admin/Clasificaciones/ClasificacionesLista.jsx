import React from "react";

const ClasificacionesLista = ({clasificaciones}) => {

    console.log("Clasificaciones", clasificaciones)
    return(
        <div className="row flex-nowrap ">
            <div className="col py-3">
                <div className="table-responsive">
                    <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Nombre </th>
                                <th> Descripcion </th>
                                <th> Acciones </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clasificaciones.length > 0 ? (
                                clasificaciones?.map((Clasificacion) => (
                                    <tr key={Clasificacion.id}>
                                        <td className=""> {Clasificacion.id} </td>
                                        <td className=""> {Clasificacion.nombre} </td>
                                        <td className=""> {Clasificacion.descripcion} </td>

                                        <td className="d-flex gap-2 justify-content-center">
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
                            ) : (
                                <tr>
                                    <td colSpan="3"> No hay clasificaciones </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClasificacionesLista;