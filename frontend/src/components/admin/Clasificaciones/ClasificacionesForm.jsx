import React from "react";
import { useForm } from "react-hook-form";

const ClasificacionesForm = ({ itemClasificacion, Volver, Grabar }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ defaultValues: itemClasificacion });

    const onSubmit = (data) => {
        data.id = itemClasificacion.id;
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
                            {...register("nombre", {
                                required: { value: true, message: "Campo requerido" },
                                maxLength: { value: 5, message: "Máximo 5 caracteres" },
                                minLength: { value: 1, message: "Mínimo 1 caracter" },
                            })}
                        />
                        {errors.nombre && (
                            <span className="text-danger text-small d-block mb-2">{errors.nombre.message}</span>
                        )}
                    </div>

                    {/* Campo descripcion */}
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">
                            Descripción
                        </label>
                        <textarea
                            className="form-control bg-dark text-light border-secondary "
                            id="descripcion"
                            name="descripcion"
                            {...register("descripcion", {})}
                        ></textarea>
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

export default ClasificacionesForm;
