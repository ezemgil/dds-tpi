import React from "react";

const GenerosLista = ({
  Generos,
  Editar,
  ActivarDesactivar,
  Pagina,
  totalGeneros,
  Paginas,
  BuscarPagina,
}) => {
  return (
    <>
      <div className="row flex-nowrap ">
        <div className="col py-3">
          <div className="table-responsive">
            <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Generos.length > 0 &&
                  Generos?.map((Genero) => (
                    <tr key={Genero.id}>
                      <td>{Genero.id}</td>
                      <td>{Genero.nombre}</td>
                      <td>{Genero.activo === 1 ? "Si" : "No"}</td>
                      <td className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-warning btn-sm rounded-pill"
                          onClick={() => Editar(Genero.id)}
                          title="Editar"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        {Genero.activo ? (
                          <button
                            className="btn btn-danger btn-sm rounded-pill"
                            onClick={() => ActivarDesactivar(Genero)}
                            title="Desactivar"
                          >
                            <i className="fa-solid fa-circle-xmark"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-success btn-sm rounded-pill"
                            onClick={() => ActivarDesactivar(Genero)}
                            title="Activar"
                          >
                            <i className="fa-solid fa-circle-check"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Paginador */}
            <div className="paginador">
              <div className="row align-items-center d-flex justify-content-center">
                <div
                  style={{ display: "flex", marginRight: "auto" }}
                  className="col text-center"
                >
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
                    <span className="pyBadge">Total: {totalGeneros}</span>
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

export default GenerosLista;
