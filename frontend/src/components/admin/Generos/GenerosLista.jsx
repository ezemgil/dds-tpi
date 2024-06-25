import React from "react";


const GenerosLista = ({ Generos, Editar, Eliminar }) => {
    return (<>
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
                {Generos?.map((Genero) => (
                    <tr key={Genero.id}>
                    <td>{Genero.id}</td>
                    <td>{Genero.nombre}</td>
                    <td className="d-flex gap-2 justify-content-center">
                        <button
                        className="btn btn-warning btn-sm"
                        onClick={() => Editar(Genero.id)}
                        >
                        <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                        className="btn btn-danger btn-sm"
                        onClick={() => Eliminar(Genero.id)}
                        >
                        <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                    </tr>
                ))
                }
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </>
    );
}

export default GenerosLista;