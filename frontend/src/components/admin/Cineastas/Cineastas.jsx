import React, { useEffect, useState } from "react";
import cineastaService from "../../../services/cineasta.service";

import CineastasLista from "./CineastasLista";
import paisService from "../../../services/pais.service";


const Cineastas = () => {

    const TituloCRUD = {
        C: "Create",
        R: "Read",
        U: "Update",
        D: "Delete",
    };
    const [AccionCRUD, setAccionCRUD] = useState("R");

    const [Paises, setPaises] = useState(null);
    // cargar al montar el componente, solo la primera vez por la dependencia entre paises y cineastas
    useEffect(() => {
        async function cargarPaises() {
            let data = await paisService.getAll();
            setPaises(data);
        }
        cargarPaises()
    }, []);

    const [Cineasta, setCineasta] = useState(null);

    const [Cineastas, setCineastas] = useState([]);
    useEffect(() => {
        cineastaService.getAll().then((response) => {
            setCineastas(response.data);
        });
    }, []);
    
    async function BuscarPorId(id) {        
        const data = await cineastaService.getById(id);
        setCineasta(data);
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
            await cineastaService.remove(Cineasta.id);
            cargarPaises()
            };
        }
    

    return (
        <div className="container-fluid">
            <h2>Cineastas</h2>
            <CineastasLista
                {...{
                    Cineastas,
                    Consultar,
                    Editar, 
                    Eliminar, 
                }}
            />
            
        </div>
    );
};

export default Cineastas;