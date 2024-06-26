import React, { useEffect, useState } from "react";
import clasificacionService from "../../../services/clasificacion.service";
import ClasificacionesLista from "./ClasificacionesLista";

const Clasificaciones = () => {

    const [ItemsClasificaciones, setClasificaciones] = useState([]);

    useEffect(() => {
        clasificacionService.getAll().then((response) => {
            setClasificaciones(response.data);
        })}, []);
    
    console.log('Clasificaciones', ItemsClasificaciones);

    
    return(
        <div>
            <h1>Clasificaciones</h1>
            <ClasificacionesLista clasificaciones={ItemsClasificaciones} />
        </div>
    )
}

export default Clasificaciones;