import React from "react";
import Modal from "react-bootstrap/Modal";
import PaisesForm from "./PaisesForm";

const PaisesFormModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bg-dark">
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.Nombre}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <PaisesForm
                    itemPais={props.itemPais}
                    Volver={props.onHide}
                    Grabar={props.Grabar}
                />
            </Modal.Body>
        </Modal>
    );
};

export default PaisesFormModal;