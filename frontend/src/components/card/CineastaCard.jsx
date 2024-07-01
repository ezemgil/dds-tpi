import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CineastaCard = ({ Id, Nombre, FechaNacimiento, FechaFallecimiento, Roles, Imagen }) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/cineasta/${Id}`);
    };
    return (
        <div className="col mb-4" onClick={handleClick}>
            <div className="card h-100 bg-dark text-white" focusable="true" tabIndex="0" role="button" 
                <img src={Imagen} className="bd-placeholder-img card-img-top" width="100%" height="300" alt={Nombre} />
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title mb-0">{Nombre}</h5>
                        {FechaFallecimiento && (
                            <span className="text-warning">
                                {FechaFallecimiento
                                    ? `${moment(FechaFallecimiento).diff(FechaNacimiento, "years")} años (fallecido)`
                                    : ""}
                            </span>
                        )}
                        {FechaNacimiento && !FechaFallecimiento && (
                            <span className="text-warning">{moment().diff(FechaNacimiento, "years")} años</span>
                        )}
                    </div>
                    <div className="d-flex gap-1 flex-wrap">
                        {Roles &&
                            Roles?.length > 0 &&
                            Roles.map((rol) => (
                                <span
                                    key={rol.id}
                                    className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill"
                                >
                                    {rol.nombre}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CineastaCard;
