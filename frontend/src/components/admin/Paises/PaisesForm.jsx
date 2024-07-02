import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const PaisesForm = ({ itemPais, Volver, Grabar }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ defaultValues: itemPais });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <div className="d-flex justify-content-center p-2 col-lg-12 col-md-12 col-sm-0">
            <form className="form col-lg-12 col-md-12" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid ">
                    {/* Campo nombre */}
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            id="nombre"
                            name="nombre"
                            {...register("nombre", { required: { value: true, message: "Campo requerido" } })}
                        />
                        {errors.nombre && (
                            <span className="text-danger text-small d-block mb-2">{errors.nombre.message}</span>
                        )}
                    </div>

                    {/* Campo codigo */}
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            id="codigo"
                            name="codigo"
                            {...register("codigo", { required: { value: true, message: "Campo requerido" } })}
                        />
                        {errors.codigo && (
                            <span className="text-danger text-small d-block mb-2">{errors.codigo.message}</span>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-2 text-dark">
                            <i className="fa-regular fa-floppy-disk me-2"></i>Guardar
                        </button>
                        <button className="btn btn-dark border border-secondary px-2 mx-2 " onClick={() => Volver()}>
                            Volver
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PaisesForm;
