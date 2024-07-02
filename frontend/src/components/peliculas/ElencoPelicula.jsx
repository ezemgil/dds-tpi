import React from "react";
import { Link } from "react-router-dom";

import SectionTitle from "../home/SectionTitle";
import CineastaCard from "../card/CineastaCard";

const ElencoPelicula = ({ Elenco }) => {
    return (
        <>
            <div className="container my-5">
                <SectionTitle
                    Titulo={
                        <>
                            <i className="fa-solid fa-clapperboard text-primary"></i>
                            <span>Elenco</span>
                        </>
                    }
                />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    {Elenco.map((cineasta) => (
                        <CineastaCard
                            key={cineasta.id}
                            Id={cineasta.id}
                            Nombre={`${cineasta.nombre} ${cineasta.apellido}`}
                            FechaNacimiento={cineasta.fecha_nacimiento}
                            Roles={cineasta.roles}
                            Imagen={cineasta.imagen || "https://via.placeholder.com/300"}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ElencoPelicula;
