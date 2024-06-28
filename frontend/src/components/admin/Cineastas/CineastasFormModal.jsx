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
                {props.titulo}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
            <CineastasForm
                itemCineasta={props.itemCineasta}
                volver={props.onHide}
                grabar={props.grabar}
            />
        </Modal.Body>
    </Modal>
    );
};

export default CineastasFormModal;