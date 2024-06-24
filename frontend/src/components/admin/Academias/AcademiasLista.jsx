import React from "react";
import { Helmet } from "react-helmet";
import moment from "moment";

const AcademiasLista = ({ Academias, Ver, Editar, Eliminar }) => {
  return (
    <>
      <Helmet>
        <title>Lista de academias</title>
      </Helmet>

      <div className="row flex-nowrap">
        <div className="col py-3">
          <div className="table-responsive">
            <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Fecha de fundación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Academias.map((academia) => (
                  <tr key={academia.id}>
                    <td>{academia.id}</td>
                    <td>{academia.nombre}</td>
                    <td>{moment(academia.fecha_fundacion).format("L")}</td>
                    <td className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => Ver(academia.id)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => Editar(academia.id)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => Eliminar(academia.id)}
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

export default AcademiasLista;
