import React, { useEffect, useState } from "react";
import paisService from "../../../services/pais.service";

import PaisesLista from "./PaisesLista";
import PaisesFormModal from "./PaisesFormModal";

const Paises = () => {
    const TituloCRUD = {
        C: "Create",
        RA: "Read all",
        U: "Update",
        D: "Delete",
    };

    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [Paises, setPaises] = useState([]);
    const [itemPais, setItemPais] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [totalPaises, setTotalPaises] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);

    // Funcion para buscar una pagina
    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        } else {
            _pagina = Pagina;
        }

        const res = await paisService.getAll(_pagina, 10);
        setPaises(res.paises);
        setTotalPaises(res.totalPaises);

        // Generar resultado para mostrar en el select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalPaises / 10); i++) {
            arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
    }

    // Listar la primera pagina de paises
    useEffect(() => {
        BuscarPagina(Pagina);
    }, [Pagina]); // Array de dependencias
    // Listar la primera pagina de paises
    useEffect(() => {
        BuscarPagina(Pagina);
    }, [Pagina]); // Array de dependencias

    // Buscar un pais por id
    async function BuscarPorId(id, accion) {
        const res = await paisService.getById(id);
        setItemPais(res.data);
        setAccionCRUD(accion);
    }

    // Editar un pais
    function Editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    }
    function Volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    }

    // Eliminar un pais
    async function Eliminar(id) {
        const res = await paisService.getById(id);
        await paisService.remove(res.data.id);
        BuscarPagina(Pagina);
        setAccionCRUD("RA");
    }

    // Grabar un pais
    async function Grabar(itemPais) {
        const paisEndpoint = {
            nombre: itemPais.nombre,
            codigo: itemPais.codigo,
        };

        if (AccionCRUD === "C") {
            await paisService.create(paisEndpoint);
        } else if (AccionCRUD === "U") {
            await paisService.update(itemPais.id, paisEndpoint);
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
    }

    // Agregar un nuevo pais
    const Agregar = () => {
        setModalShow(true);
        setItemPais({
            nombre: "",
            codigo: null,
        });
        setAccionCRUD("C");
    };

    return (
        <div>
            <h1>Paises</h1>
            <button
                className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
                onClick={() => {
                    Agregar();
                }}
            >
                <i className="fa-solid fa-plus me-2"></i> Agregar pais
            </button>

            <div className="container-fluid">
                <PaisesLista
                    {...{
                        Paises,
                        Editar,
                        Eliminar,
                        Pagina,
                        totalPaises,
                        Paginas,
                        BuscarPagina,
                    }}
                />

                {AccionCRUD === "C" && (
                    <PaisesFormModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        itemPais={itemPais}
                        Grabar={Grabar}
                        Volver={Volver}
                        Nombre={"Paises " + TituloCRUD[AccionCRUD]}
                    />
                )}

                {AccionCRUD === "U" && (
                    <PaisesFormModal
                        show={modalShow}
                        onHide={() => {
                            setModalShow(false);
                            setAccionCRUD("RA");
                        }}
                        itemPais={itemPais}
                        Grabar={Grabar}
                        Volver={Volver}
                        Titulo={"Paises " + TituloCRUD[AccionCRUD]}
                    />
                )}
            </div>
        </div>
    );
};

export default Paises;
