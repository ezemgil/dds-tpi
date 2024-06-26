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
    const [itemPelicula, setItemPelicula] = useState({});
    const [modalShow, setModalShow] = useState(false);

    // Create
    // Remove
    // Update
    // Delete


    const BuscarPorId = async (idPelicula, accion) => {
        const resPelicula = await peliculaService.getById(idPelicula);
        setItemPelicula(resPelicula.data);
        setAccionCRUD(accion)
    }

    // const BuscarPorNombre = async (nombrePelicula) => {
    //     const resPelicula = await peliculaService.getByNombre(nombrePelicula);
    //     setPeliculas(resPelicula)
    // }

    useEffect(() => {
        peliculaService.getAll().then((response) => setPeliculas(response.data))
    }, []);

    const Grabar = (itemPelicula) => {
        if (AccionCRUD === "C") {
            peliculaService.create(itemPelicula);
        } else {
            peliculaService.update(itemPelicula.id, itemPelicula);
        }
        setAccionCRUD("RA");
    }

    const Agregar = () => {
        setModalShow(true);
        setItemPelicula({
            titulo: "",
            descripcion: "",
            calificacion: 0,
            duracion: 0,
            fecha_estreno: new Date(),
            clasificacion: {
                nombre: "",
                descripcion: ""
            },
            generos: []
        })
        setAccionCRUD("C");
    }
    
    const Editar = (idPelicula) => {
        setModalShow(true);
        BuscarPorId(idPelicula, "U")
    }

    const Eliminar = () => {}

    const Volver = () => {
        setModalShow(false);
        setAccionCRUD("RA");
    }


    return (
        <div>
            <h1>Peliculas</h1>
            <button className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => {Agregar()}}>
                <i className="fa-solid fa-plus me-2"></i> Agregar pelicula
            </button>


            <PeliculasLista
                Peliculas={Peliculas}
                Editar={Editar}
                Eliminar={Eliminar}
            />

            {AccionCRUD === "C" && (
                <PeliculasFormModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    itemPelicula={itemPelicula}
                    Grabar={Grabar}
                    Titulo={'Peliculas ' + TituloCRUD[AccionCRUD]}>
                </PeliculasFormModal>
            )}

            {AccionCRUD === "U" && (
                <PeliculasFormModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");}}
                    itemPelicula={itemPelicula}
                    Grabar={Grabar}
                    Titulo={'Peliculas ' + TituloCRUD[AccionCRUD]}>
                </PeliculasFormModal>
            )}
        </div>
    );
}

export default Peliculas;