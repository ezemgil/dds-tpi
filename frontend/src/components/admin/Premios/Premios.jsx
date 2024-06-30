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

    useEffect(() => {
        premioService.getAll().then((response) => setPremios(response.data));
    }, []);

    async function findPremioById(id, AccionCRUD) {
        const response = await premioService.getById(id);
        setItemPremio(response.data);
        setAccionCRUD(AccionCRUD);
    }

    async function Guardar(data) {
        if (AccionCRUD === "C") {
            await premioService.create(data);
        } else {
            await premioService.update(itemPremio.id, data);
        }
        premioService.getAll().then((response) => setPremios(response.data));
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
                premioService.getAll().then((response) => setPremios(response.data));
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

            <PremiosLista premios={Premios} Editar={Editar} Eliminar={Eliminar} />

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
