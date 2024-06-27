import React from "react";
import Modal from "react-bootstrap/Modal";
import CineastasForm from "./CineastasForm";

const CineastasFormModal = (props) => {
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
            <CineastasForm
                itemCineasta={props.itemCineasta}
                Volver={props.onHide}
                Grabar={props.Grabar}
            />
        </Modal.Body>
    </Modal>
    );
};

export default CineastasFormModal;