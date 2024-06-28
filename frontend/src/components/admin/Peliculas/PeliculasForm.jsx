import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import clasificacionService from "../../../services/clasificacion.service";
import generosService from "../../../services/genero.service";
import idiomaService from "../../../services/idioma.service";

const PeliculasForm = ({ itemPelicula, Volver, Grabar }) => {
    const [clasificaciones, setClasificaciones] = React.useState([]);
    const [clasificacionItem, setClasificacionItem] = React.useState({});
    const [urlImagen, setImagen] = React.useState("");

    const [generos, setGeneros] = React.useState([]);
    const [generosItem, setGenerosItem] = React.useState([{}]);
    const [generoModalShow, setGeneroModalShow] = React.useState(false);

    const [idiomas, setIdiomas] = React.useState([]);
    const [idiomasItem, setIdiomasItem] = React.useState([{}]);
    const [idiomaModalShow, setIdiomaModalShow] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ defaultValues: itemPelicula });

    const onSubmit = (data) => {
        data.generos = generosItem;
        data.clasificacion = clasificacionItem.id;
        data.imagen = urlImagen;
        data.idiomas = idiomasItem;

        Grabar(data);
    };

    const handleGenerosModal = () => {
        setGeneroModalShow(!generoModalShow);
    };

    const handleIdiomaModal = () => {
        setIdiomaModalShow(!idiomaModalShow);
    };

    const agregarGenero = (genero) => {
        let listaGeneros = [];
        listaGeneros = generosItem.concat(genero);
        setGenerosItem(listaGeneros);
    };

    const agregarIdioma = (idioma) => {
        let listaIdiomas = [];
        listaIdiomas = idiomasItem.concat(idioma);
        setIdiomasItem(listaIdiomas);
    };

    const retirarIdioma = (idiomaId) => {
        let listaIdiomas = [];
        listaIdiomas = idiomasItem.filter((idioma) => idioma.id !== idiomaId);
        setIdiomasItem(listaIdiomas);
    };

    const retirarGenero = (generoId) => {
        let listaGeneros = [];
        listaGeneros = generosItem.filter((genero) => genero.id !== generoId);
        setGenerosItem(listaGeneros);
    };

    React.useEffect(() => {
        setImagen(itemPelicula.imagen);
        setClasificacionItem(itemPelicula.clasificacion);
        setGenerosItem(itemPelicula.generos);
        setIdiomasItem(itemPelicula.idiomas);
        clasificacionService.getAll().then((response) => {
            setClasificaciones(response.data);
        });
        generosService.getAll().then((response) => {
            setGeneros(response.data.generos);
        });
        idiomaService.getAll().then((response) => {
            setIdiomas(response.data);
        });
    }, []);

    return (
        <div className="d-flex justify-content-center p-2 col-lg-12 col-md-12 col-sm-0">
            <form className="form col-lg-12 col-md-12" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid ">
                    {/* Campo titulo */}
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">
                            Titulo
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            id="titulo"
                            name="titulo"
                            {...register("titulo", { required: { value: true, message: "Campo requerido" } })}
                        />
                    </div>

                    {/* Campo titulo_original */}
                    <div className="mb-3">
                        <label htmlFor="titulo_original" className="form-label">
                            Titulo Original
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            id="titulo_original"
                            name="titulo_original"
                            {...register("titulo_original", { required: { value: true, message: "Campo requerido" } })}
                        />
                    </div>

                    {/* Campo descripcion */}
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">
                            Descripcion
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary "
                            id="descripcion"
                            name="descripcion"
                            {...register("descripcion", {})}
                        ></textarea>
                    </div>
                    {/* Campo fecha_estreno */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="fecha_estreno" className="col-form-label">
                                Fecha Estreno
                            </label>
                            <input
                                type="date"
                                id="fecha_estreno"
                                name="fecha_estreno"
                                {...register("fecha_estreno", {
                                    required: { value: true, message: "Campo requerido" },
                                })}
                                className={
                                    "bg-dark text-light border-secondary form-control" +
                                    (errors?.fecha_estreno ? " is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">{errors?.fecha_estreno?.message}</div>
                        </div>
                    </div>

                    {/* Campo clasificacion setClasificacionItem(clasificaciones[(e.value) - 1])*/}

                    <div className="row">
                        <label htmlFor="clasificacion" className="col-form-label">
                            Clasificacion
                        </label>
                        <div className="mb-3 d-flex">
                            <span className="badge d-flex p-2 me-3 fs-5 align-items-center text-bg-warning rounded-pill">
                                {clasificacionItem.nombre}
                                {/* {clasificacionItem.nombre == '' ? 'N/A' : clasificacionItem.nombre} */}
                            </span>
                            <select
                                value={clasificacionItem?.id || ""}
                                onChange={(e) =>
                                    setClasificacionItem(clasificaciones.find((clasi) => clasi.id == e.target.value))
                                }
                                className="form-select bg-dark text-light border-secondary"
                                id="clasificacion"
                                name="clasificacion"
                            >
                                <option disabled={true} key={""} value={""}>
                                    Seleccione un campo
                                </option>
                                {clasificaciones?.map((clas) => (
                                    <option key={clas.id} value={clas.id}>
                                        {" "}
                                        {clas.nombre} | {clas.descripcion}{" "}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Campo generos */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="generos">Generos</label>

                            <div className="d-flex flex-wrap gap-2 justify-content-left">
                                {generosItem.map((genero) => (
                                    <span className="badge d-flex p-2 align-items-center text-bg-warning rounded-pill">
                                        <span className="px-1">{genero.nombre}</span>
                                        <div className="p-1" onClick={() => retirarGenero(genero.id)}>
                                            <i className="fs-6 fa-solid fa-circle-xmark text-tertiary"></i>
                                        </div>
                                    </span>
                                ))}
                                <span
                                    className="btn badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
                                    onClick={() => handleGenerosModal()}
                                >
                                    <i className="fa-solid fa-plus me-2"></i>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </div>

                            <Modal show={generoModalShow} onHide={handleGenerosModal}>
                                <Modal.Header className="bg-dark">
                                    <Modal.Title>Añadir géneros</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="bg-dark">
                                    <div className="rounded d-flex flex-wrap w-100">
                                        {generos.map((genero) =>
                                            generosItem.find((g) => g.id == genero.id) ? null : (
                                                <button
                                                    key={genero.id}
                                                    onClick={() =>
                                                        agregarGenero(generos.find((g) => g.id == genero.id))
                                                    }
                                                    className="btn bg-dark d-flex badge m-1 p-2 border border-warning rounded-pill"
                                                >
                                                    <span className="px-1">{genero.nombre}</span>
                                                </button>
                                            )
                                        )}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="bg-dark">
                                    <Button variant="secondary" onClick={handleGenerosModal}>
                                        Cerrar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>

                    {/* Campo idiomas */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="Idiomas">Idiomas</label>

                            <div className="d-flex flex-wrap gap-2 justify-content-left">
                                {idiomasItem.map((idioma) => (
                                    <span className="badge d-flex p-2 align-items-center text-bg-warning rounded-pill">
                                        <span className="px-1">{idioma.nombre}</span>
                                        <div className="p-1" onClick={() => retirarIdioma(idioma.id)}>
                                            <i className="fs-6 fa-solid fa-circle-xmark text-tertiary"></i>
                                        </div>
                                    </span>
                                ))}
                                <span
                                    className="btn badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
                                    onClick={() => handleIdiomaModal()}
                                >
                                    <i className="fa-solid fa-plus me-2"></i>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </div>

                            <Modal show={idiomaModalShow} onHide={handleIdiomaModal}>
                                <Modal.Header className="bg-dark">
                                    <Modal.Title>Añadir idiomas</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="bg-dark">
                                    <div className="rounded d-flex flex-wrap w-100">
                                        {idiomas.map((idioma) =>
                                            idiomasItem.find((g) => g.id == idioma.id) ? null : (
                                                <button
                                                    key={idioma.id}
                                                    onClick={() =>
                                                        agregarIdioma(idiomas.find((g) => g.id == idioma.id))
                                                    }
                                                    className="btn bg-dark d-flex badge m-1 p-2 border border-warning rounded-pill"
                                                >
                                                    <span className="px-1">{idioma.nombre}</span>
                                                </button>
                                            )
                                        )}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="bg-dark">
                                    <Button variant="secondary" onClick={handleIdiomaModal}>
                                        Cerrar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>

                    {/* Campo imagen y calificacion y duracion */}
                    <div className="row align-items-center">
                        <div className="col-sm-6  flex-column justify-content-center ">
                            <div>
                                <label htmlFor="imagen" className="col-form-label">
                                    Imagen de portada
                                </label>
                            </div>
                            <input
                                type="text"
                                id="imagen"
                                name="imagen"
                                onKeyUp={(e) => setImagen(e.target.value)}
                                {...register("imagen", {
                                    required: { value: true, message: "Campo requerido" },
                                })}
                                className={
                                    "bg-dark text-light border-secondary form-control mb-2" +
                                    (errors?.fecha_estreno ? " is-invalid" : "")
                                }
                            />

                            <div className="w-auto d-flex justify-content-center">
                                <img
                                    src={urlImagen !== "" ? urlImagen : "https://via.placeholder.com/300"}
                                    alt="Poster de la pelicula"
                                    className="img-fluid rounded shadow col-lg-5 col-5 mb-3 mb-lg-3"
                                />
                            </div>

                            <div className="invalid-feedback">{errors?.fecha_estreno?.message}</div>
                        </div>

                        <div className="col">
                            {/* Campo calificacion */}
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="calificacion" className="col-form-label">
                                        Calificacion
                                    </label>
                                    <input
                                        type="number"
                                        id="calificacion"
                                        name="calificacion"
                                        step={0.1}
                                        {...register("calificacion", {
                                            required: { value: true, message: "Campo requerido" },
                                            min: { value: 0, message: "Puntuacion minima: 0" },
                                            max: { value: 10, message: "Puntuacion maxima: 10" },
                                        })}
                                        className={
                                            "bg-dark text-light border-secondary form-control" +
                                            (errors?.calificacion ? " is-invalid" : "")
                                        }
                                    />
                                    <div className="invalid-feedback">{errors?.calificacion?.message}</div>
                                </div>
                            </div>

                            {/* Campo duracion */}
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="duracion" className="col-form-label">
                                        Duracion
                                    </label>
                                    <input
                                        type="number"
                                        id="duracion"
                                        name="duracion"
                                        {...register("duracion", {
                                            required: { value: true, message: "El campo duracion es obligatorio" },
                                            min: { value: 1, message: "Duracion minima: 1" },
                                        })}
                                        className={
                                            "bg-dark text-light border-secondary form-control" +
                                            (errors?.duracion ? " is-invalid" : "")
                                        }
                                    />
                                    <div className="invalid-feedback">{errors?.duracion?.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de accion */}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-2 text-dark">
                            <i className="fa-regular fa-floppy-disk me-2"></i>Guardar
                        </button>
                        <button className="btn btn-dark border border-secondary px-2 mx-2 " onClick={() => Volver()}>
                            Volver
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PeliculasForm;
