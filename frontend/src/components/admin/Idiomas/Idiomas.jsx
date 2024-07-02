import React, { useEffect, useState } from "react";
import idiomaService from "../../../services/idioma.service";

import IdiomasLista from "./IdiomasLista";
import IdiomasFormModal from "./IdiomasFormModal";

const Idiomas = () => {
    const TituloCRUD = {
        C: "(Crear)",
        RA: "(Ver todos)",
        U: "(Actualizar)",
        D: "(Eliminar)",
    };

    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [Idiomas, setIdiomas] = useState([]);
    const [itemIdioma, setItemIdioma] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [totalIdiomas, setTotalIdiomas] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);

    // Funcion para buscar una pagina
    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        } else {
            _pagina = Pagina;
        }

        const res = await idiomaService.getAll(_pagina, 10);
        setIdiomas(res.idiomas);
        setTotalIdiomas(res.totalIdiomas);

        // Generar resultado para mostrar en el select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalIdiomas / 10); i++) {
            arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
    }

    // Funcion para listar la primera pagina de paises
    useEffect(() => {
        BuscarPagina(Pagina);
    }, [Pagina]); // Array de dependencias

    // Funcion para buscar un idioma por id
    async function BuscarPorId(id, accion) {
        const res = await idiomaService.getById(id);
        setItemIdioma(res.data);
        setAccionCRUD(accion);
    }

    // Funcion para editar un idioma
    function Editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    }

    // Grabar un idioma
    async function Grabar(itemIdioma) {
        if (AccionCRUD === "C") {
            await idiomaService.create(itemIdioma);
        } else if (AccionCRUD === "U") {
            await idiomaService.update(itemIdioma.id, itemIdioma);
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
    }

    // Agregar un nuevo idioma
    const Agregar = () => {
        setModalShow(true);
        setItemIdioma({
            nombre: "",
            activo: 0,
        });
        setAccionCRUD("C");
    };

    // Funcion para el boton volver
    function Volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    }

    // Activar o desactivar un idioma
    async function ActivarDesactivar(idioma) {
        await idiomaService.update(idioma.id, { activo: idioma.activo ? 0 : 1 });
        BuscarPagina(Pagina);
    }

    return (
        <div>
            <h1>Idiomas</h1>
            <button
                className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
                onClick={() => {
                    Agregar();
                }}
            >
                <i className="fa-solid fa-plus me-2"></i> Agregar idioma
            </button>

            <div className="container-fluid">
                <IdiomasLista
                    {...{
                        Idiomas,
                        Editar,
                        ActivarDesactivar,
                        Pagina,
                        totalIdiomas,
                        Paginas,
                        BuscarPagina,
                    }}
                />

                {AccionCRUD === "C" && (
                    <IdiomasFormModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        itemIdioma={itemIdioma}
                        Grabar={Grabar}
                        Volver={Volver}
                        Titulo={"Idiomas " + TituloCRUD[AccionCRUD]}
                    />
                )}

                {AccionCRUD === "U" && (
                    <IdiomasFormModal
                        show={modalShow}
                        onHide={() => {
                            setModalShow(false);
                            setAccionCRUD("RA");
                        }}
                        itemIdioma={itemIdioma}
                        Grabar={Grabar}
                        Volver={Volver}
                        Titulo={"Idiomas " + TituloCRUD[AccionCRUD]}
                    />
                )}
            </div>
        </div>
    );
};

export default Idiomas;
