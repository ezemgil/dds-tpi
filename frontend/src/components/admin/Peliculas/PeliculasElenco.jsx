import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import cineastaService from "../../../services/cineasta.service";
import peliculaService from "../../../services/pelicula.service";

const PeliculasElenco = ({ itemPelicula, Volver, Grabar }) => {

    const [elencoItem, setElencoItem] = useState([{}]);
    const [listaCineastas, setCineastas] = useState([{}]);
    const [modalShow, setModalShow] = useState(false);
    const [busquedaCineastas, setBusquedaCineastas] = useState([]);
    const [cineastaSeleccionado, setCineastaSeleccionado] = useState({});
    


    useEffect(() => {
        peliculaService.getElenco(itemPelicula.id).then((response) => setElencoItem(response.data));
    },[]);

    const agregarCineasta = () => {
        setBusquedaCineastas([])
        setModalShow(true);
    }

    const seleccionarCineasta = (cineasta) => {
        setElencoItem([...elencoItem, cineasta]);
    }

    const RetirarCineasta = (id) => {
        setElencoItem(elencoItem.filter((c) => c.id !== id));
    }

    const buscarCineasta = (nombre_buscar) => {
        cineastaService.getByName(nombre_buscar)
        .then((response) => setBusquedaCineastas(response.data));
    }

    return (
        <div>
            <div className="container rounded d-flex flex-wrap w-100">
                <div className="d-flex flex-column mx-2 ">
                    <button 
                    onClick={() => agregarCineasta()} 
                    className="text-light btn   p-2 border border-secondary btn-custom-light"
                    style={{width: '100px', height: '120px'}}>
                        <i className="fa-solid fa-user-plus m-1 rounded-pill border border-light p-2"></i>
                        <span className="px-1 m-1">Agregar</span>
                    </button>
                </div>
                
                {elencoItem.map(
                    (cineasta) => (
                    <div className="d-flex flex-column mx-2" style={{width: 'fit-content', position: 'relative'}}>
                        <div
                        className="d-flex position-absolute justify-content-center align-items-center btn-custom-delete-img" style={{height: '120px', width: '100%', zIndex: '1'}}>
                            <i className=" fa-solid fa-trash-can p-2 border rounded-pill"></i>
                        </div>
                        <img 
                        onClick={() => {RetirarCineasta(cineasta.id)}} 
                        className="img rounded img-fluid shadow btn-custom-delete-img" 
                        style={{ width: '100px', height: '120px', objectFit: 'cover', objectPosition: 'top', zIndex: '2'}} 
                        src={cineasta.imagen}></img>
                        <span className="w-100"> {cineasta.nombre}</span>
                        <span className="w-100"> {cineasta.apellido}</span>
                    </div>
                ))}
            </div>

            <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            top
            className="bg-dark-70"
            >
                <Modal.Header closeButton className="bg-dark">
                    <Modal.Title>Agregar cineasta</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <div className="container form-container">
                        <input 
                        className='form-control bg-dark border-secondary text-light' 
                        type="text"
                        onChange={(e) => e.target.value.length > 0 ? buscarCineasta(e.target.value) : setBusquedaCineastas([])}></input>
                        <ul className="my-2">
                            {busquedaCineastas.length > 0 ? (
                                busquedaCineastas.map((cineasta) => 
                                    (<li 
                                    key={cineasta.id} 
                                    onClick={() => seleccionarCineasta(cineasta)}
                                    className={`btn  rounded-pill shadow-sm mx-2 my-1 ${elencoItem.map(c => c.id).includes(cineasta.id) ? 'text-subtle border border-secondary disabled text-decoration-line-through' : 'btn-secondary'}`}>
                                        <i className="fa-solid fa-user-plus fs-8 mx-2"></i>
                                        {cineasta.nombre} {cineasta.apellido}
                                    </li>)
                                )) : (<li className="my-4">No hay resultados</li>)}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <button className="btn btn-secondary" onClick={() => setModalShow(false)}>Finalizar</button>
                </Modal.Footer>
            </Modal>
            

            {/* Botones de accion */}
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-2 text-dark" onClick={() => Grabar(itemPelicula.id, elencoItem)}><i className="fa-regular fa-floppy-disk me-2"></i>Guardar</button>
                <button className='btn btn-dark border border-secondary px-2 mx-2 ' onClick={() => Volver()}>Volver</button>
            </div>
        </div>
    )
}

export default PeliculasElenco;