import React from "react";
import Modal from "react-bootstrap/Modal";
import PeliculasForm from "./PeliculasForm";
import PeliculasNominaciones from "./PeliculasNominaciones";

const PeliculasFormModal = (props) => {
    return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton className="bg-dark">
            <Modal.Title id="contained-modal-title-vcenter">
                {props.Titulo}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
            {props.AccionCRUD === "C" &&
            <PeliculasForm
                itemPelicula={props.itemPelicula}
                Volver={props.onHide}
                Grabar={props.Grabar}
            />}

            {props.AccionCRUD === "U" && 
            <PeliculasForm
                itemPelicula={props.itemPelicula}
                Volver={props.onHide}
                Grabar={props.Grabar}
            />}

            {props.AccionCRUD === "U_NOMINACIONES" &&
            <PeliculasNominaciones
                itemPelicula={props.itemPelicula}
                Volver={props.onHide}
                Grabar={props.Grabar}
            />}

        </Modal.Body>
    </Modal>
    );
};

export default PeliculasFormModal;
