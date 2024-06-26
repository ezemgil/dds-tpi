import React, { useState, useEffect } from "react";

import NominacionesLista from "./NominacionesLista";

import nominacionService from "../../../services/nominacion.service";

const Nominaciones = () => {

    const TituloCRUD = {
        C: "Create",
        R: "Read",
        U: "Update",
        D: "Delete",
    };
    const [AccionCRUD, setAccionCRUD] = useState("R");

    const [Premios, setPremios] = useState(null);
    // cargar al montar el componente, solo la primera vez por la dependencia entre paises y cineastas
    // useEffect(() => {
    //     async function cargarPremio() {
    //         let data = await premioService.getAll();
    //         setPremios(data);
    //     }
    //     cargarNominaciones()
    // }, []);


    const [Nominacion, setNominacion] = useState(null);
    const [Nominaciones, setNominaciones] = useState([]);

    useEffect(() => {
        nominacionService.getAll().then((response) => {
            setNominaciones(response.data);
        });
    }, []);
    
    async function BuscarPorId(id) {        
        const data = await nominacionService.getById(id);
        setNominacion(data);
        console.log(id)
        
    }

    function Consultar(id) {
        BuscarPorId(id);
    }

    function Editar() {
        console.log("Editar");
    }

    function Eliminar() {
        window.alert("Esta seguro que desea eliminar el cineasta?");
        async () => {
            await nominacionService.remove(Nominacion.id);
            useEffect(() => {
                nominacionService.getAll().then((response) => {
                    setNominaciones(response.data);
                });
            }, []);
            };
        }
    

    return (
        <div className="container-fluid">
            <h2>Nominaciones y premios</h2>
            <NominacionesLista
                {...{
                    Nominaciones,
                    Consultar,
                    Editar, 
                    Eliminar, 
                }}
            />
            
        </div>
    );
};

export default Nominaciones;