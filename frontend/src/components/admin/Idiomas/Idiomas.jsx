import React, { useEffect, useState } from "react";
import idiomaService from "../../../services/idioma.service";

import IdiomasLista from "./IdiomasLista";


const Idiomas = () => {

    const TituloCRUD = {
        C: "(Create)",
        R: "(Read)",
        U: "(Update)",
        D: "(Delete)",
    };
    const [AccionCRUD, setAccionCRUD] = useState("R");

    const [Idiomas, setIdiomas] = useState([]);
    useEffect (() => {
        idiomaService.getAll().then((response) => {
            setIdiomas(response.data);
        });
    }, []);
    

    function Editar() {
        console.log("Editar");
        useEffect(() => {
            setAccionCRUD("U")
        })
        console.log(AccionCRUD)
    };

    function Eliminar() {
        console.log("Eliminar");
    };

    return (
        <div className="container-fluid">
            <h2>Idiomas</h2>
            <IdiomasLista
                {...{
                    Idiomas, 
                    Editar, 
                    Eliminar, 
                }}
            />
            
        </div>
    );
}

export default Idiomas;