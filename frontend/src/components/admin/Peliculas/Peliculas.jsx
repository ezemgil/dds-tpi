import moment from "moment";
import React, { useEffect, useState } from "react";
import nominacionService from "../../../services/nominacion.service";
import nominacionesService from "../../../services/nominaciones.service";
import peliculaService from "../../../services/pelicula.service";
import PeliculasFormModal from "./PeliculasFormModal";
import PeliculasLista from "./PeliculasLista";
import { Helmet } from "react-helmet";

const Peliculas = () => {
    const TituloCRUD = {
        RA: "(Listado)",
        C: "(Crear)",
        U: "(Editar)",
        U_ELENCO: "(Editar elenco)",
        U_NOMINACIONES: "(Editar nominaciones)",
    };

    const [Peliculas, setPeliculas] = useState([]);
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [itemPelicula, setItemPelicula] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [nominacionesDePelicula, setNominacionesDePelicula] = useState([{}]);

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
    }, [Pagina]);

    // Funcion para buscar una pelicula por su id
    const BuscarPorId = async (idPelicula, accion) => {
        const resPelicula = await peliculaService.getById(idPelicula);
        setItemPelicula(resPelicula.data);
        setAccionCRUD(accion);
    };

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
            imagen: itemPelicula.imagen,
        };

        if (AccionCRUD === "C") {
            await peliculaService.create(peliculaEndpoint);
        } else if (AccionCRUD === "U") {
            await peliculaService.update(itemPelicula.id, peliculaEndpoint);
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
    };

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
                descripcion: "",
            },
            generos: [],
            idiomas: [],
            imagen: "https://via.placeholder.com/150",
        });
        setAccionCRUD("C");
    };

    // Funcion para el boton editar una pelicula
    const Editar = (idPelicula) => {
        setModalShow(true);
        BuscarPorId(idPelicula, "U");
    };

    const EditarElenco = (idPelicula) => {
        setModalShow(true);
        BuscarPorId(idPelicula, "U_ELENCO");
    };

    const EditarNominaciones = (idPelicula) => {
        nominacionesService.getByPeliculaId(idPelicula).then((response) => setNominacionesDePelicula(response.data));
        setModalShow(true);
        BuscarPorId(idPelicula, "U_NOMINACIONES");
    };

    const Eliminar = (id_pelicula) => {
        peliculaService.remove(id_pelicula).then(() => {
            BuscarPagina(Pagina);
            setAccionCRUD("RA");
        });
        BuscarPagina(Pagina);
        setAccionCRUD("RA");
    };

    const GrabarNominaciones = (nominaciones) => {
        const dataEndpoint = { id_premio: 0, id_pelicula: itemPelicula.id, fecha_nominacion: "", fue_ganador: 0 };

        nominaciones.forEach((n) => {
            dataEndpoint.id_premio = n.premio.id;
            dataEndpoint.fecha_nominacion = n.fecha_nominacion;
            dataEndpoint.fue_ganador = n.fue_ganador;

            nominacionesDePelicula.map((nom) => nom.id).includes(n.id)
                ? nominacionService.update(n.id, dataEndpoint)
                : nominacionService.create(dataEndpoint);
        });

        nominacionesDePelicula.forEach((np) => {
            if (!nominaciones.map((n) => n.id).includes(np.id)) {
                nominacionService.remove(np.id);
            }
        });
        setModalShow(false);
    };

    const GrabarElenco = (id_pelicula, elenco) => {
        const dataEndpoint = { cineastas: elenco.map((cin) => cin.id) };
        peliculaService.updateElenco(id_pelicula, dataEndpoint);
        setModalShow(false);
    };
    return (
        <div>
            <Helmet>
                <title>Lista de películas</title>
            </Helmet>

            <h1>Peliculas</h1>
            <button
                className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
                onClick={() => {
                    Agregar();
                }}
            >
                <i className="fa-solid fa-plus me-2"></i> Agregar película
            </button>

            <PeliculasLista
                {...{
                    Peliculas,
                    Editar,
                    Eliminar,
                    EditarElenco,
                    EditarNominaciones,
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
                    Titulo={"Peliculas " + TituloCRUD[AccionCRUD]}
                    AccionCRUD={AccionCRUD}
                ></PeliculasFormModal>
            )}

            {AccionCRUD === "U" && (
                <PeliculasFormModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");
                    }}
                    itemPelicula={itemPelicula}
                    Grabar={Grabar}
                    Titulo={"Peliculas " + TituloCRUD[AccionCRUD]}
                    AccionCRUD={AccionCRUD}
                ></PeliculasFormModal>
            )}

            {AccionCRUD === "U_ELENCO" && (
                <PeliculasFormModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");
                    }}
                    itemPelicula={itemPelicula}
                    Grabar={GrabarElenco}
                    Titulo={"Peliculas " + TituloCRUD[AccionCRUD]}
                    AccionCRUD={AccionCRUD}
                ></PeliculasFormModal>
            )}

            {AccionCRUD === "U_NOMINACIONES" && (
                <PeliculasFormModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");
                    }}
                    itemPelicula={itemPelicula}
                    Grabar={GrabarNominaciones}
                    Titulo={"Peliculas " + TituloCRUD[AccionCRUD]}
                    AccionCRUD={AccionCRUD}
                ></PeliculasFormModal>
            )}
        </div>
    );
};

export default Peliculas;
