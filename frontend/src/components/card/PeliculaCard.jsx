import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PeliculaCard = ({
  Id,
  Titulo,
  Calificacion,
  Generos,
  FechaEstreno,
  Duracion,
  Imagen,
}) => {
  let navigate = useNavigate();
  const handleClick = () => {
    // console.log("Click en la película", Id);
    // Aquí puedes redirigir al componente de detalle de la película
    // Pasando los datos correspondientes como props o utilizando una ruta dinámica
    // Por ejemplo:
    // history.push(`/detalle-pelicula/${Id}`);
    // O
    // <Lin to={`/pelicula/${Id}`}>Ver detalle</Link>
    navigate(`/pelicula/${Id}`);
  };

  return (
    <div className="col mb-4">
      <div className="card" onClick={handleClick}>
        <img
          src={Imagen}
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="300"
          alt={Titulo}
        />
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">{Titulo}</h5>
            <div className="d-flex gap-1 flex-wrap my-1">
              {Generos &&
                Generos.map((genero) => (
                  <span
                    key={genero}
                    className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill"
                  >
                    {genero}
                  </span>
                ))}
            </div>
            <div className="d-flex gap-2 card-text">
              {FechaEstreno && (
                <span>
                  <b className="text-warning">Año: </b>
                  {moment(FechaEstreno).format("YYYY")}
                </span>
              )}
              <div className="vr"></div>
              {Duracion && (
                <span>
                  <b className="text-warning">Duración:</b> {Duracion} min
                </span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {Calificacion && (
              <span className="text-warning">
                <i className="fa-solid fa-star"></i> {Calificacion}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeliculaCard;
