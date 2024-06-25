import React, { useEffect, useState } from "react";
import peliculaService from "../../../services/pelicula.service";
import PeliculasForm from "./PeliculasForm";
import PeliculasLista from "./PeliculasLista";

const Peliculas = () => {

    const TituloCRUD = {
        RA: "(Listado)",
        C: "(Crear Pelicula)",
        U: "(Editar Pelicula)",
        D: "(Eliminar Pelicula)",
    }

    const [Peliculas, setPeliculas] = useState([]);
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [itemPelicula, setItemPelicula] = useState(null);

    // Create
    // Remove
    // Update
    // Delete


    const BuscarPorId = async (idPelicula, accion) => {
        const resPelicula = await peliculaService.getById(idPelicula);
        
        setItemPelicula(resPelicula.data);
        setAccionCRUD(accion);
    }

    useEffect(() => {
        peliculaService.getAll().then((response) => {
            setPeliculas(response.data);
        });
    }, []);

    const Grabar = (itemPelicula) => {
        if (AccionCRUD === "C") {
            peliculaService.create(itemPelicula);
        } else {
            peliculaService.update(itemPelicula.id, itemPelicula);
        }
        setAccionCRUD("RA");
    }

    const Editar = (itemPelicula) => {
        BuscarPorId(itemPelicula, "U")
    }
    const Eliminar = () => {}

    const Volver = () => {
        setAccionCRUD("RA");
    }


    return (
        <div>
            <h1>Peliculas <small>{TituloCRUD[AccionCRUD]}</small></h1>


            {AccionCRUD === "RA" && (
                <PeliculasLista Peliculas={Peliculas}
                    Editar={Editar}
                    Eliminar={Eliminar}
                />
            )}
            

            {AccionCRUD === "U" && (
                <PeliculasForm 
                    Volver={Volver}
                    itemPelicula={itemPelicula}
                />
            )}
        </div>

        
    );
}

export default Peliculas;