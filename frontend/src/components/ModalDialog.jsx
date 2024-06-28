import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import modalService from "../services/modal.service";

function ModalDialog() {
    const [mensaje, setMensaje] = useState("");
    const [titulo, setTitulo] = useState("");
    const [boton1, setBoton1] = useState("");
    const [boton2, setBoton2] = useState("");
    const [accionBoton1, setAccionBoton1] = useState(null);
    const [accionBoton2, setAccionBoton2] = useState(null);
    const [tipo, setTipo] = useState("");

    const handleAccionBoton1 = () => {
        if (accionBoton1) {
            accionBoton1();
        }
        setMensaje("");
    };
    const handleAccionBoton2 = () => {
        if (accionBoton2) {
            accionBoton2();
        }
        setMensaje("");
    };

    const handleClose = () => {
        setMensaje("");
    };

    function Show(
        // cuidado en esta funcion cuando se invoca desde el servicio modalDialogService
        //   NO tiene las variables de state del componente, ej mensaje, titulo, boton1....
        //   pero SI a las funciones setMensaje, setTitulo, setBoton1....
        _mensaje,
        _titulo,
        _boton1,
        _boton2,
        _accionBoton1,
        _accionBoton2,
        _tipo
    ) {
        setMensaje(_mensaje);
        setTitulo(_titulo);
        setBoton1(_boton1);
        setBoton2(_boton2);
        setAccionBoton1(_accionBoton1);
        setAccionBoton2(_accionBoton2);
        setTipo(_tipo);
    }

    useEffect(() => {
        //suscribirse al servicio modalDialogService al iniciar el componente
        modalService.subscribeShow(Show);
        return () => {
            //desuscribirse al servicio modalDialogService al desmontar el componente
            modalService.subscribeShow(null);
        };
    }, []);

    let classHeader = "";
    let faIcon = "";
    switch (tipo) {
        case "success":
            faIcon = "fa-regular fa-circle-check";
            break;
        case "danger":
            faIcon = "fa-solid fa-triangle-exclamation";
            break;
        case "info":
            faIcon = "fa-solid fa-circle-info";
            break;
        case "warning":
            faIcon = "fa-solid fa-triangle-exclamation";
            break;
        case "error":
            faIcon = "fa-solid fa-triangle-exclamation";
        default:
            break;
    }

    if (mensaje === "") return null;

    return (
        <>
            <Modal show onHide={handleClose} backdrop="static" keyboard={mensaje === "BloquearPantalla" ? false : true}>
                <Modal.Header className="bg-dark" closeButton={mensaje !== "BloquearPantalla"}>
                    <Modal.Title>{titulo}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-dark">
                    {mensaje === "BloquearPantalla" ? (
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                aria-valuenow="100"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ flex: 1 }}
                            ></div>
                        </div>
                    ) : (
                        <p>
                            <i className={faIcon + " me-2"} />
                            {mensaje}
                        </p>
                    )}
                </Modal.Body>

                <Modal.Footer className="bg-dark">
                    {boton1 !== "" && (
                        <button type="button" className="btn btn-primary" onClick={handleAccionBoton1}>
                            {boton1}
                        </button>
                    )}
                    {boton2 !== "" && (
                        <button type="button" className="btn btn-secondary" onClick={handleAccionBoton2}>
                            {boton2}
                        </button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDialog;
