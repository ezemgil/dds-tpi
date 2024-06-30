import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import nominacionesService from "../../../services/nominaciones.service";
import premioService from "../../../services/premio.service";

// TODO
const PeliculasNominaciones = ({itemPelicula, Volver, Grabar}) => {

    const [nominaciones, setNominaciones] = useState([]);
    const [nominacionItem, setNominacionItem] = useState({});
    const [subaccionCRUD, setSubaccionCRUD] = useState("RA");
    const [subModalShow, setSubModalShow] = useState(false);
    const [listaPremios, setListaPremios] = useState([]);
    const [premioNominacion, setPremioNominacion] = useState({});


    useEffect(() => {
        premioService.getAll().then((response) => setListaPremios(response.data));
        nominacionesService.getByPeliculaId(itemPelicula.id).then((response) => setNominaciones(response.data))
    }, []);

    const EditarNominacion = (nominacion) => {
        setNominacionItem(nominacion);
        setSubModalShow(true);
        setSubaccionCRUD("U");
    }

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted } 
    } = useForm({defaultValues: itemPelicula});

    

    const AgregarNominacion = () => {
        setNominacionItem({
            id: 0,
            fecha_nominacion: "",
            fue_ganador: 1,
            id_pelicula: itemPelicula.id,
            id_premio: {}
        });
        setSubModalShow(true);
        setSubaccionCRUD("C");
    }

    const GrabarNominacion = (nominacion) => {
        setNominaciones([...nominaciones, nominacion]);
        setSubModalShow(false);
    }

    const GrabarEdicionNominacion = (nominacion) => {
        setNominaciones([...nominaciones.filter((n) => n.id !== nominacion.id), nominacion]);

        setSubModalShow(false);
    }

    const Eliminar = (id) => {
        setNominaciones([...nominaciones.filter((n) => n.id !== id)]);
        
    }   


    return (
        <div>
            <div className="h3">{itemPelicula.titulo}</div>
            {/* {console.log(itemPelicula, nominaciones, nominaciones.map((nominacion) => nominacion.premio.nombre))} */}

            <button className="badge d-flex p-2 m-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => AgregarNominacion()}>
                <i className="fa-solid fa-plus me-2"></i> Nueva nominacion
            </button>

            <table className="table table-striped table-dark text-center table-bordered table-hover table-sm">
                <thead>
                    <th>Fecha nominacion</th>
                    <th>Fue Ganador</th>
                    <th>Nombre de Premio</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {nominaciones.map((nominacion) => (
                        <tr key={nominacion.id}>
                            <td>{nominacion.fecha_nominacion}</td>
                            <td>{nominacion.fue_ganador ? "Si" : "No"}</td>
                            <td>{nominacion.premio.nombre}</td>
                            <td className="d-flex gap-2 justify-content-center">
                                <button
                                className="btn btn-warning btn-sm rounded-pill"
                                onClick={() => {console.log(nominacion.fue_ganador); EditarNominacion(nominacion)}}>
                                        <i className="fa-solid fa-pencil text-danger-emphasis"></i>
                                </button>
                                <button
                                className="btn btn-danger btn-sm rounded-pill"
                                onClick={() => Eliminar(nominacion.id)}>
                                        <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={subModalShow}
                onHide={() => setSubModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="bg-dark-70"
            >
                <Modal.Header className="bg-dark">
                    <div className="h3">Nueva nominacion</div>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    <div className="row">
                        <div className="col form-group">
                            <label htmlFor="fecha_nominacion">Fecha de nominacion</label>
                            <input
                                type="date"
                                className="form-control bg-dark text-light border border-secondary"
                                id="fecha_nominacion"
                                value={nominacionItem.fecha_nominacion}
                                onChange={(e) => setNominacionItem({ ...nominacionItem, fecha_nominacion: e.target.value })}
                                {...register("fecha_nominacion", { required: true })}
                            />
                        </div>


                        <div className="col form-group">
                            <label htmlFor="id_premio">Premio</label>
                            <select
                            className="form-select bg-dark text-light border border-secondary w-100"
                            id="id_premio"
                            onChange={(e) => setNominacionItem({ ...nominacionItem, premio: listaPremios.find((p) => p.id == e.target.value)})}>
                                {listaPremios.map((premio) => (
                                    <option selected={premio.id == nominacionItem.premio?.id} value={premio.id}>{premio.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col form-group mt-4">
                            <label htmlFor="fue_ganador">Fue ganador: </label>
                            <button
                            className={`btn ${nominacionItem.fue_ganador ? 'btn-success'  : 'btn-danger'} btn-sm rounded-pill ms-2`}
                            onClick={() =>setNominacionItem({ ...nominacionItem, fue_ganador: nominacionItem.fue_ganador ? 0 : 1 })}
                            title={"fue_ganador"}
                            ><i className={`fa-solid ${nominacionItem.fue_ganador ? 'fa-circle-check'  : 'fa-circle-xmark'}`}></i></button>
                        </div>
                    </div>
                    <div className="d-flex w-100 mt-4 justify-content-center">
                        <button 
                            className="btn btn-primary mx-2 text-dark" 
                            onClick={() => subaccionCRUD === "U" ? 
                            GrabarEdicionNominacion(nominacionItem) : 
                            GrabarNominacion(nominacionItem)}>
                                <i className="fa-regular fa-floppy-disk me-2" ></i>Guardar
                        </button>
                        <button className='btn btn-dark border border-secondary px-2 mx-2 ' onClick={() => setSubModalShow(false)}>Cancelar</button>
                    </div>

                </Modal.Body>
            </Modal>

            {/* Botones de accion */}
            <div className="d-flex w-100 justify-content-end">
                <button type="submit" className="btn btn-primary mx-2 text-dark" onClick={() => {Grabar(nominaciones)}}><i className="fa-regular fa-floppy-disk me-2" ></i>Guardar</button>
                <button className='btn btn-dark border border-secondary px-2 mx-2 ' onClick={() => Volver()}>Volver</button>
                <button className='btn btn-danger border border-secondary px-2 mx-2 ' onClick={() => console.log(nominaciones)}>aa</button>
            </div>

        </div>
    )
}

export default PeliculasNominaciones;
