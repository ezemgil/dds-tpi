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

    // Constantes para paginacion
    const [totalPeliculas, setTotalPeliculas] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);


    // Funcion para buscar una pagina
    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
          setPagina(_pagina);
        } else {
          _pagina = Pagina;
        }
    
        const res = await peliculaService.getAll(_pagina, 10);
        setPeliculas(res.peliculas);
        setTotalPeliculas(res.totalPeliculas);
    
        // Generar resultado para mostrar en el select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalPeliculas / 10); i++) {
          arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
      }
    
    // Funcion para listar la primera pagina de clasificaciones
    useEffect(() => {
        BuscarPagina(Pagina);
      }, [Pagina]); // Array de dependencias

    
    // Funcion para buscar una pelicula por su id
    const BuscarPorId = async (idPelicula, accion) => {
        const resPelicula = await peliculaService.getById(idPelicula);
        setItemPelicula(resPelicula.data);
        setAccionCRUD(accion)
    }


    // Funcion para grabar o actualizar una pelicula
    const Grabar = async (itemPelicula) => {
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
            await peliculaService.create(peliculaEndpoint)
        } else if (AccionCRUD === "U"){
            await peliculaService.update(itemPelicula.id, peliculaEndpoint)
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
    }

    // Funcion del boton agregar una pelicula
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
    
    // Funcion para el boton editar una pelicula
    const Editar = (idPelicula) => {
        setModalShow(true);
        BuscarPorId(idPelicula, "U")
    }

    // Funcion para el boton eliminar una pelicula
    const Eliminar = (id_pelicula) => {
        peliculaService.remove(id_pelicula).then((response) => {
            peliculaService.getAll().then((response) => setPeliculas(response.data))
        })
        BuscarPagina(Pagina);
        setAccionCRUD("RA");

    }

    return (
        <div>
            <h1>Peliculas</h1>
            <button className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => {Agregar()}}>
                <i className="fa-solid fa-plus me-2"></i> Agregar pelicula
            </button>


            <PeliculasLista
            {...{
                Peliculas,
                Editar,
                Eliminar,
                Pagina,
                totalPeliculas,
                Paginas,
                BuscarPagina,
            }}
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