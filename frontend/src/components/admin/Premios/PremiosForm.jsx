import React from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

const PremiosForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ defaultValues: props.Premio });

    const onSubmit = (data) => {
        props.Guardar(data);
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="text-light ">
            <Modal.Header closeButton className="bg-dark">
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.AccionCRUD === "C" ? "Agregar género" : "Editar género"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark ">
                <div className="d-flex justify-content-center p-2 col-lg-12 col-md-12 col-sm-0">
                    <form className="form col-lg-12 col-md-12" action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid ">
                            <label htmlFor="nombre" className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control bg-dark text-light border-secondary"
                                name="nombre"
                                {...register("nombre", {
                                    required: { value: true, message: "Nombre es requerido" },
                                })}
                            />
                            {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary mx-2 text-dark">
                                <i className="fa-regular fa-floppy-disk me-2"></i>Guardar
                            </button>
                            <button className="btn btn-dark border border-secondary px-2 mx-2" onClick={props.onHide}>
                                Volver
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PremiosForm;
