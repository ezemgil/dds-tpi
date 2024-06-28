import moment from "moment";
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

    const BuscarPorId = async (idPelicula, accion) => {
        const resPelicula = await peliculaService.getById(idPelicula);
        setItemPelicula(resPelicula.data);
        setAccionCRUD(accion)
    }


    useEffect(() => {
        peliculaService.getAll().then((response) => setPeliculas(response.data))
    }, []);


    const Grabar = (itemPelicula) => {
        const peliculaEndpoint = {
            titulo: itemPelicula.titulo,
            titulo_original: itemPelicula.titulo_original,
            descripcion: itemPelicula.descripcion,
            calificacion: itemPelicula.calificacion,
            duracion: itemPelicula.duracion,
            fecha_estreno: itemPelicula.fecha_estreno,
            id_clasificacion: itemPelicula.clasificacion,
            generos: itemPelicula.generos.map((g) => g.id),
            idiomas: itemPelicula.idiomas.map((i) => i.id),
            imagen: itemPelicula.imagen
        }

        if (AccionCRUD === "C") {
            peliculaService.create(peliculaEndpoint)
            .then((response) => {
                peliculaService.getAll().then((response) => setPeliculas(response.data))
            })
        } else {
            peliculaService.update(itemPelicula.id, peliculaEndpoint).then((response) => {
                peliculaService.getAll().then((response) => setPeliculas(response.data))
            })
        }
        setAccionCRUD("RA");
    }

    const Agregar = () => {
        setModalShow(true);
        setItemPelicula({
            titulo: "",
            titulo_original: "",
            descripcion: "",
            calificacion: 0,
            duracion: 0,
            fecha_estreno: moment().format("YYYY-MM-DD"),
            clasificacion: {
                nombre: "",
                descripcion: ""
            },
            generos: [],
            idiomas: [],
            imagen: "https://via.placeholder.com/150"

        })
        setAccionCRUD("C");
    }
    
    const Editar = (idPelicula) => {
        setModalShow(true);
        BuscarPorId(idPelicula, "U")
    }



    const Eliminar = (id_pelicula) => {
        peliculaService.remove(id_pelicula).then((response) => {
            peliculaService.getAll().then((response) => setPeliculas(response.data))
        })
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