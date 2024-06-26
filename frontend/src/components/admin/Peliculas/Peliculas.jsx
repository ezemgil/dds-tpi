import React, { useEffect, useState } from "react";
import peliculaService from "../../../services/pelicula.service";
import PeliculasFormModal from "./PeliculasFormModal";
import PeliculasLista from "./PeliculasLista";


const Peliculas = () => {

    const TituloCRUD = {
        RA: "(Listado)",
        C: "(Crear)",
        U: "(Editar)",
    }

    const [Peliculas, setPeliculas] = useState([]);
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [itemPelicula, setItemPelicula] = useState(null);
    const [modalShow, setModalShow] = useState(false);

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
        setModalShow(true);
        BuscarPorId(itemPelicula, "U")
    }
    const Eliminar = () => {}

    const Volver = () => {
        setAccionCRUD("RA");
    }


    return (
        <div>
            <h1>Peliculas</h1>
            <form className="d-flex">
                <input type="text" className="input form-control form  me-3"></input>
                <button className="btn btn-warning"> <i class="fa-solid fa-magnifying-glass"></i></button>
            </form>


            <PeliculasLista
                Peliculas={Peliculas}
                Editar={Editar}
                Eliminar={Eliminar}
            />
            

            {AccionCRUD === "U" && (
                <PeliculasFormModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    itemPelicula={itemPelicula}
                    Grabar={Grabar}
                    Titulo={'Peliculas ' + TituloCRUD[AccionCRUD]}>
                </PeliculasFormModal>
            )}
        </div>
    );
}

export default Peliculas;