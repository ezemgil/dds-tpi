import React, { useState, useEffect } from "react";

import NominacionesLista from "./NominacionesLista";
import NominacionesFormModal from "./NominacionesFormModal";

import nominacionService from "../../../services/nominacion.service";

const Nominaciones = () => {

    const TituloCRUD = {
        C: "Create",
        RA: "Read all",
        U: "Update",
        D: "Delete",
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
        for (let i = 1; i <= Math.ceil(res.totalIdiomas / 10); i++) {
          arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
    }

    // Funcion para listar la primera pagina de nominaciones
    useEffect(() => {
        BuscarPagina(Pagina);
      }, [Pagina]); // Array de dependencias

    // Funcion para buscar un idioma por id
    async function BuscarPorId(id, accion) {
        const res = await nominacionService.getById(id);
        setItemNominacion(res.data);
        setAccionCRUD(accion);
    };

    // Funcion para editar un nominacion
    function Editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    };

    // Grabar un idioma
    async function Grabar(itemNominacion) {
        if (AccionCRUD === "C") {
          await nominacionService.create(itemNominacion);
        } else if (AccionCRUD === "U") {
          await nominacionService.update(itemNominacion.id, itemNominacion);
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
      }
  
      // Agregar un nuevo idioma
      const Agregar = () => {
        setModalShow(true);
        setItemNominacion({
            premio: {
                nombre: "",
            },
            id_pelicula: [],
            fecha_nominacion: moment().format("YYYY-MM-DD"),
            fue_ganador: 0,
        });
        setAccionCRUD("C");
      };
  
      // Funcion para el boton volver
      function Volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    }


    function Consultar(id) {
        BuscarPorId(id);
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