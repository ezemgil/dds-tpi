import React, { useEffect, useState } from "react";
import cineastaService from "../../../services/cineasta.service";

import CineastasLista from "./CineastasLista";
import paisService from "../../../services/pais.service";
import CineastasFormModal from "./CineastasFormModal";


const Cineastas = () => {

    const TituloCRUD = {
        C: "Create",
        RA: "Read all",
        U: "Update",
        D: "Delete",
    };
    
    const [Cineastas, setCineastas] = useState([]);
    const [itemCineasta, setItemCineasta] = useState({});
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [modalShow, setModalShow] = useState(false);

    const [Paises, setPaises] = useState(null);
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
    const Grabar = (itemCineasta) => {
        if (AccionCRUD === "C") {
            cineastaService.create(itemCineasta);
        } else if (AccionCRUD === "U") {
            cineastaService.update(itemCineasta.id, itemCineasta);
        }
        setAccionCRUD("RA");
    };

    // Agregar un nuevo cineasta
    const Agregar = () => {
        setModalShow(true);
        setItemCineasta({
            nombre: "",
            apellido: "",
            fecha_nacimiento: new Date(),
            fecha_fallecimiento: new Date(),
            bibliografia: "",
            imagen: "",
            nacionalidad: []
        });
        setAccionCRUD("C");
    };

    // Editar un cineasta
    function Editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    };

    // Eliminar un cineasta
    function Eliminar() {
        window.alert("Esta seguro que desea eliminar el cineasta?");
        async () => {
            await cineastaService.remove(itemCineasta.id);
            };
        setAccionCRUD("RA");
        };

    function Volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    };
    
    return (
        <div>
            <h1>Cineastas</h1>
            <button className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => {Agregar()}}>
                <i className="fa-solid fa-plus me-2"></i> Agregar cineasta
            </button>

            <div className="container-fluid">
                <CineastasLista
                    {...{
                        Cineastas,
                        Editar, 
                        Eliminar, 
                    }}
                />

                {AccionCRUD === "C" && (
                    <CineastasFormModal
                        show={modalShow}
                        onHide={() => 
                            setModalShow(false)}                            
                        itemCineasta={itemCineasta}
                        Grabar={Grabar}
                        Volver={Volver}
                        Titulo={'Cineastas ' + TituloCRUD[AccionCRUD]}
                    />
                )}

                {AccionCRUD === "U" && (
                    <CineastasFormModal
                        show={modalShow}
                        onHide={() => {
                            setModalShow(false);
                            setAccionCRUD("RA");}}
                        itemCineasta={itemCineasta}
                        Grabar={Grabar}
                        Volver={Volver}
                        Titulo={'Cineastas ' + TituloCRUD[AccionCRUD]}
                    />
                )}

            </div>

        </div>
    );
};

export default Cineastas;