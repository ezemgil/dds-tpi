import React, { useEffect, useState } from "react";
import paisService from "../../../services/pais.service";

import PaisesLista from "./PaisesLista";

const Paises = () => {
    
        const [Paises, setPaises] = useState([]);
        useEffect(() => {
            paisService.getAll().then((response) => {
                setPaises(response.data);
            });
        }, []);
        
        function Editar() {
            console.log("Editar");
        }
    
        function Eliminar() {
            console.log("Eliminar");
        }
    
        return (
            <div className="container-fluid">
                <h2>Paises</h2>
                <PaisesLista
                    {...{
                        Paises, 
                        Editar, 
                        Eliminar, 
                    }}
                />
                
            </div>
        );
}

export default Paises;