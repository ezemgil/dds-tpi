import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import PremiosLista from "./PremiosLista";
import PremiosForm from "./PremiosForm";

import premioService from "../../../services/premio.service";

const Premios = () => {
    const [Premios, setPremios] = useState([]);
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [itemPremio, setItemPremio] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [totalPremios, setTotalPremios] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);

    useEffect(() => {
        BuscarPagina(Pagina);
    }, [Pagina]);

    async function findPremioById(id, AccionCRUD) {
        const response = await premioService.getById(id);
        setItemPremio(response.data);
        setAccionCRUD(AccionCRUD);
    }

    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        } else {
            _pagina = Pagina;
        }

        const res = await premioService.getAll(_pagina, 10);
        setPremios(res.premios);
        setTotalPremios(res.totalPremios);

        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalPremios / 10); i++) {
            arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
    }

    async function Guardar(data) {
        if (AccionCRUD === "C") {
            await premioService.create(data);
        } else {
            await premioService.update(itemPremio.id, data);
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
    }

    const Agregar = () => {
        setModalShow(true);
        setAccionCRUD("C");
        setItemPremio({
            nombre: "",
        });
    };

    const Editar = (idPremio) => {
        setModalShow(true);
        findPremioById(idPremio, "U");
    };

    const Eliminar = (idPremio) => {
        window.confirm("¿Está seguro de eliminar el premio?") &&
            premioService.remove(idPremio).then(() => {
                BuscarPagina(Pagina);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Lista de premios</title>
            </Helmet>
            <h1>Premios</h1>
            <button
                className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
                onClick={() => {
                    Agregar();
                }}
            >
                <i className="fa-solid fa-plus me-2"></i> Agregar premio
            </button>

            <PremiosLista {...{ Premios, Editar, Eliminar, Paginas, Pagina, totalPremios, BuscarPagina }} />

            {AccionCRUD === "C" && (
                <PremiosForm
                    AccionCRUD={AccionCRUD}
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");
                    }}
                    Premio={itemPremio}
                    Guardar={Guardar}
                />
            )}

            {AccionCRUD === "U" && (
                <PremiosForm
                    AccionCRUD={AccionCRUD}
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");
                    }}
                    Premio={itemPremio}
                    Editar={Editar}
                    Guardar={Guardar}
                    Eliminar={Eliminar}
                />
            )}
        </div>
    );
};

export default Premios;
