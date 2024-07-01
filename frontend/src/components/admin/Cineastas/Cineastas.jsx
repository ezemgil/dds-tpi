import React, { useEffect, useState } from "react";
import cineastaService from "../../../services/cineasta.service";

import paisService from "../../../services/pais.service";
import CineastasFormModal from "./CineastasFormModal";
import CineastasLista from "./CineastasLista";


const Cineastas = () => {

    const TituloCRUD = {
        C: "(Nuevo)",
        RA: "(Listado)",
        U: "(Edicion)",
        D: "(Eliminacion)",
    };
    
    const [cineastas, setCineastas] = useState([]);
    const [itemCineasta, setItemCineasta] = useState({});
    const [AccionCRUD, setAccionCRUD] = useState("RA");
    const [modalShow, setModalShow] = useState(false);

    const [totalCineastas, setTotalCineastas] = useState(0);
    const [Pagina, setPagina] = useState(0);
    const [Paginas, setPaginas] = useState([]);

    // Funcion para buscar una pagina
    async function BuscarPagina(_pagina) {
        if (_pagina && _pagina !== Pagina) {
          setPagina(_pagina);
        } else {
          _pagina = Pagina;
        }
    
        const res = await cineastaService.getAll(_pagina, 10);
        setCineastas(res.cineastas);
        setTotalCineastas(res.totalCineastas);
    
        // Generar resultado para mostrar en el select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(res.totalCineastas / 10); i++) {
          arrPaginas.push(i - 1);
        }
        setPaginas(arrPaginas);
      }

    // Funcion para listar la primera pagina de clasificaciones
    useEffect(() => {
        BuscarPagina(Pagina);
      }, [Pagina]); // Array de dependencias

    
    // Buscar un cineasta por id
    async function BuscarPorId(id, accion) {
        const data = await cineastaService.getById(id);
        setItemCineasta(data.data);
        setAccionCRUD(accion);
    };

    // Grabar o actualizar un cineasta
    const grabar = async (itemCineasta) => {
        const cineastaEndpoint = {
            nombre: itemCineasta.nombre,
            apellido: itemCineasta.apellido,
            fecha_nacimiento: itemCineasta.fecha_nacimiento,
            fecha_fallecimiento: itemCineasta.fecha_fallecimiento,
            biografia: itemCineasta.biografia,
            imagen: itemCineasta.imagen,
            nacionalidad: itemCineasta.pais.id,
            nacionalidad2: itemCineasta.pais2.id,
            roles: itemCineasta.roles.map((r) => r.id)
        }

        if (AccionCRUD === "C") {
            await cineastaService.create(cineastaEndpoint)
        } else if (AccionCRUD === "U") {
            await cineastaService.update(itemCineasta.id, cineastaEndpoint)
        };
        BuscarPagina(Pagina);
        setModalShow(false);
        setAccionCRUD("RA");
    };

    // Agregar un nuevo cineasta
    const agregar = () => {
        setModalShow(true);
        setItemCineasta({
            nombre: "",
            apellido: "",
            fecha_nacimiento: new Date(),
            fecha_fallecimiento: null,
            biografia: "",
            imagen: "",
            pais: {},
            pais2: {},
            roles: [],
        });
        setAccionCRUD("C");
    };

    // editar un cineasta
    function editar(id) {
        setModalShow(true);
        BuscarPorId(id, "U");
    };

    // eliminar un cineasta
    function eliminar(id_cineasta) {
        // windows alert con opcion de continuar y cancelar
        if (window.confirm("¿Está seguro de eliminar el cineasta?")) {  
            cineastaService.remove(id_cineasta).then(() => {
                cineastaService.getAll().then((response) => setCineastas(response.data));
            });
        };
        setAccionCRUD("RA");
    };

    function volver() {
        setModalShow(false);
        setAccionCRUD("RA");
    };
    
    return (
        <div>
            <h1>Cineastas</h1>
            <button className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => {agregar()}}>
                <i className="fa-solid fa-plus me-2"></i> Agregar cineasta
            </button>

            <div className="container-fluid">
                <CineastasLista
                    {...{
                        cineastas, 
                        editar, 
                        eliminar,
                        Pagina,
                        totalCineastas,
                        Paginas,
                        BuscarPagina 
                    }}
                />

                {AccionCRUD === "C" && (
                    <CineastasFormModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        itemCineasta={itemCineasta}
                        grabar={grabar}
                        volver={volver}
                        titulo={'Cineastas ' + TituloCRUD[AccionCRUD]}
                    />
                )}

                {AccionCRUD === "U" && (
                    <CineastasFormModal
                        show={modalShow}
                        onHide={() => {setModalShow(false); setAccionCRUD("RA");}}
                        itemCineasta={itemCineasta}
                        grabar={grabar}
                        titulo={'Cineastas ' + TituloCRUD[AccionCRUD]}
                    />
                )}

            </div>

        </div>
    );
};

export default Cineastas;