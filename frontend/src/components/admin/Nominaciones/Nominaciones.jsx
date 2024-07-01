import React, { useState, useEffect } from "react";

import NominacionesLista from "./NominacionesLista";

import nominacionService from "../../../services/nominacion.service";

const Nominaciones = () => {

    const TituloCRUD = {
        C: "Crear",
        RA: "Listado",
        U: "Actualizar",
        D: "Eliminar",
    };

    const [Nominaciones, setNominaciones] = useState([]);
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [itemNominacion, setItemNominacion] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [totalNominaciones, setTotalNominaciones] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);
    
    // Funcion para buscar una pagina
    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
          setPagina(_pagina);
        } else {
          _pagina = Pagina;
        }
    
        const res = await nominacionService.getAll(_pagina, 10);
        setNominaciones(res.nominaciones);
        setTotalNominaciones(res.totalNominaciones);
    
        // Generar resultado para mostrar en el select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalNominaciones / 10); i++) {
          arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
    }

    // Funcion para listar la primera pagina de nominaciones
    useEffect(() => {
        BuscarPagina(Pagina);
      }, [Pagina]); // Array de dependencias vacio para que solo se ejecute una vez


    function Consultar(id) {
        console.log("Consultar nominacion");
    };
    

    return (
        <div>
            <h1>Nominaciones y premios</h1>
            <div className="container-fluid">
                <NominacionesLista
                    {...{
                        Nominaciones, 
                        Consultar, 
                        Pagina,
                        totalNominaciones,
                        Paginas,
                        BuscarPagina, 
                    }}
                />

            </div>

        </div>
    );
};

export default Nominaciones;