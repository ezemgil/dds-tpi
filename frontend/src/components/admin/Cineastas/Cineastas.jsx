import React, { useEffect, useState } from "react";
import cineastaService from "../../../services/cineasta.service";

import paisService from "../../../services/pais.service";
import CineastasFormModal from "./CineastasFormModal";
import CineastasLista from "./CineastasLista";


const Cineastas = () => {

    const TituloCRUD = {
        C: "(Nuevo)",
        RA: "(Listado)",
        U: "(Edicion)",
        D: "(Eliminacion)",
    };
    
    const [cineastas, setCineastas] = useState([]);
    const [itemCineasta, setItemCineasta] = useState({});
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [modalShow, setModalShow] = useState(false);

    const [paises, setPaises] = useState(null);
    // cargar al montar el componente, solo la primera vez por la dependencia entre paises y cineastas
    useEffect(() => {
        async function cargarPaises() {
            let data = await paisService.getAll();
            setPaises(data);
        }
        cargarPaises()
    }, []);

    // Listar todos los cineastas
    useEffect(() => {
        cineastaService.getAll().then((response) => {
            setCineastas(response.data);
        });
    }, []);
    
    // Buscar un cineasta por id
    async function BuscarPorId(id, accion) {
        const data = await cineastaService.getById(id);
        setItemCineasta(data.data);
        setAccionCRUD(accion);
    };

    // Grabar o actualizar un cineasta
    const grabar = (itemCineasta) => {
        const cineastaEndpoint = {
            nombre: itemCineasta.nombre,
            apellido: itemCineasta.apellido,
            fecha_nacimiento: itemCineasta.fecha_nacimiento,
            fecha_fallecimiento: itemCineasta.fecha_fallecimiento,
            biografia: itemCineasta.biografia,
            imagen: itemCineasta.imagen,
            nacionalidad: itemCineasta.pais.id,
            nacionalidad2: itemCineasta.pais2.id,
            roles: itemCineasta.roles.map((r) => r.id)
        }

        console.log("Grabar cineasta: ", cineastaEndpoint);
        console.log("paises", itemCineasta.pais, itemCineasta.pais2);

        if (AccionCRUD === "C") {
            cineastaService.create(cineastaEndpoint)
            .then((response) => {
                cineastaService.getAll().then((response) => setCineastas(response.data))
            });
        } else if (AccionCRUD === "U") {
            cineastaService.update(itemCineasta.id, cineastaEndpoint)
            .then((response) => {cineastaService.getAll().then((response) => setCineastas(response.data))});
        }
        setAccionCRUD("RA");
    };

    // Agregar un nuevo cineasta
    const agregar = () => {
        setModalShow(true);
        setItemCineasta({
            nombre: "",
            apellido: "",
            fecha_nacimiento: new Date(),
            fecha_fallecimiento: null,
            biografia: "",
            imagen: "",
            pais: {},
            pais2: {},
            roles: [],
        });
        setAccionCRUD("C");
    };

    // editar un cineasta
    function editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    };

    // eliminar un cineasta
    function eliminar(id_cineasta) {
        // windows alert con opcion de continuar y cancelar
        if (window.confirm("¿Está seguro de eliminar el cineasta?")) {  
            cineastaService.remove(id_cineasta).then(() => {
                cineastaService.getAll().then((response) => setCineastas(response.data));
            });
        };
        setAccionCRUD("RA");
    };

    function volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    };
    
    return (
        <div>
            <h1>Cineastas</h1>
            <button className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => {agregar()}}>
                <i className="fa-solid fa-plus me-2"></i> Agregar cineasta
            </button>

            <div className="container-fluid">
                <CineastasLista
                    {...{
                        cineastas,
                        editar, 
                        eliminar, 
                    }}
                />

                {AccionCRUD === "C" && (
                    <CineastasFormModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        itemCineasta={itemCineasta}
                        grabar={grabar}
                        volver={volver}
                        titulo={'Cineastas ' + TituloCRUD[AccionCRUD]}
                    />
                )}

                {AccionCRUD === "U" && (
                    <CineastasFormModal
                        show={modalShow}
                        onHide={() => {setModalShow(false); setAccionCRUD("RA");}}
                        itemCineasta={itemCineasta}
                        grabar={grabar}
                        titulo={'Cineastas ' + TituloCRUD[AccionCRUD]}
                    />
                )}

            </div>

        </div>
    );
};

export default Cineastas;