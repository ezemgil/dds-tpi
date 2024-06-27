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

    const [AccionCRUD, setAccionCRUD] = useState("RA")
    const [Paises, setPaises] = useState([]);
    const [itemPais, setItemPais] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);
    
    // Listar todos los paises
    useEffect(() => {
        async function cargarPaises() {
            paisService.getAll().then((response) => {
                setPaises(response.data);
        });}
        cargarPaises(
    )}, []);

    // Buscar un pais por id
    async function BuscarPorId(id, accion) {
        const res = await paisService.getById(id);
        setItemPais(res.data);
        setAccionCRUD(accion);
    };

    // Editar un pais
    function Editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U")
    };
    
    // Eliminar un pais
    function Eliminar() {
        console.log("Eliminar");
    };

    // Grabar un pais
    function Grabar(itemPais) {
        if (AccionCRUD === "C") {
            paisService.create(itemPais);
        } else if (AccionCRUD === "U") {
            paisService.update(itemPais.id, itemPais);
        }
        setAccionCRUD("RA");
    };

    // Agregar un nuevo pais
    const Agregar = () => {
        setModalShow(true);
        setItemPais({
            nombre: "",
            codigo: "",
        });
        setAccionCRUD("C");
    };

    function Volver() {
        setAccionCRUD("RA");
    };
    
    return (
        <div>
                <h1>Paises</h1>
                <button className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => {Agregar()}}>
                    <i className="fa-solid fa-plus me-2"></i> Agregar pais
                </button>
                
                <div className="container-fluid">
                    <PaisesLista
                        {...{
                            Paises, 
                            Editar, 
                            Eliminar, 
                        }}
                    />

                    {AccionCRUD === "C" && (
                        <PaisesFormModal
                            show={modalShow}
                            onHide={() =>
                                setModalShow(true)}
                            itemPais={itemPais}
                            Grabar={Grabar}
                            Volver={Volver}
                            Nombre={'Paises ' + TituloCRUD[AccionCRUD]}
                        />

                    )};
                        
                    {AccionCRUD === "U" && (
                        <PaisesFormModal
                            show={modalShow}
                            onHide={() => {
                                setModalShow(false);
                                setAccionCRUD("RA");}}
                            itemPais={itemPais}
                            Grabar={Grabar}
                            Volver={Volver}
                            Titulo={'Paises ' + TituloCRUD[AccionCRUD]}
                            
                        />
                    )};

                </div>

            </div>
        );
    };
    
    export default Paises;