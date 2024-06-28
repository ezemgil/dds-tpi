import React from "react";
import Modal from "react-bootstrap/Modal";
import IdiomasForm from "./IdiomasForm";

const IdiomasFormModal = (props) => {
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
                <IdiomasForm
                    itemIdioma={props.itemIdioma}
                    Volver={props.Volver}
                    Grabar={props.Grabar}
                />
            </Modal.Body>
        </Modal>
    );
};

export default IdiomasFormModal;