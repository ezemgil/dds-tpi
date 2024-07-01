import React, { useEffect, useState } from "react";

import clasificacionService from "../../../services/clasificacion.service";

import ClasificacionesLista from "./ClasificacionesLista";
import ClasificacionesFormModal from "./ClasificacionesFormModal";

const Clasificaciones = () => {
    
    const TituloCRUD = {
        C: "(Create)",
        RA: "(Read All)",
        U: "(Update)",
        D: "(Delete)",
    };

    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [Clasificaciones, setClasificaciones] = useState([]);
    const [itemClasificacion, setItemClasificacion] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [totalClasificaciones, setTotalClasificaciones] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);


    // Funcion para buscar una pagina
    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
          setPagina(_pagina);
        } else {
          _pagina = Pagina;
        }
    
        const res = await clasificacionService.getAll(_pagina, 10);
        setClasificaciones(res.clasificaciones);
        setTotalClasificaciones(res.totalClasificaciones);
    
        // Generar resultado para mostrar en el select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalClasificaciones / 10); i++) {
          arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
      }


    // Funcion para listar la primera pagina de clasificaciones
    useEffect(() => {
        BuscarPagina(Pagina);
      }, [Pagina]); // Array de dependencias

      
     // Funcion para buscar una clasificacion por id
     async function BuscarPorId(id, accion) {
        const res = await clasificacionService.getById(id);
        setItemClasificacion(res.data);
        setAccionCRUD(accion);
    };
    
    // Funcion para editar una clasificacion
    function Editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    };

    // Grabar una clasificacion
    async function Grabar(itemClasificacion) {
        if (AccionCRUD === "C") {
          await clasificacionService.create(itemClasificacion);
        } else if (AccionCRUD === "U") {
          await clasificacionService.update(itemClasificacion.id, itemClasificacion);
        }
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
      }
  
    // Agregar un nuevo clasificacion
    const Agregar = () => {
        setModalShow(true);
        setItemClasificacion({
        nombre: "",
        activo: 0,
        });
    setAccionCRUD("C");
    };

    // Funcion para el boton volver
    function Volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    };

    // Activar o desactivar una clasificacion
    async function ActivarDesactivar(clasificacion) {
        await clasificacionService.update(clasificacion.id, { activo: clasificacion.activo ? 0 : 1 });
        BuscarPagina(Pagina);
    };

    return (
        <div>
            <h1>Clasificaciones</h1>
            <button
              className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill"
              onClick={() => {
                Agregar();
              }}
            >
              <i className="fa-solid fa-plus me-2"></i> Agregar clasificacion
            </button>

        <div className="container-fluid">
            <ClasificacionesLista
                {...{
                    Clasificaciones, 
                    Editar, 
                    ActivarDesactivar,
                    Pagina,
                    totalClasificaciones,
                    Paginas,
                    BuscarPagina,
                }}
            />
            
            {AccionCRUD === "C" && (
                <ClasificacionesFormModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    itemClasificacion={itemClasificacion}
                    Grabar={Grabar}
                    Volver={Volver}
                    Titulo={"Clasificaciones " + TituloCRUD[AccionCRUD]}
                />
            )}

            {AccionCRUD === "U" && (
                <ClasificacionesFormModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setAccionCRUD("RA");
                    }}
                    itemClasificacion={itemClasificacion}
                    Grabar={Grabar}
                    Volver={Volver}
                    Titulo={"Clasificaciones " + TituloCRUD[AccionCRUD]}
                />
            )}
            </div>
        </div>
    );
}

export default Clasificaciones;