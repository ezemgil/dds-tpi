import React from "react";
import { useForm } from "react-hook-form";

const CineastasForm = ({itemCineasta, Volver, Grabar}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted } 
    } = useForm({defaultValues: itemCineasta});

    const onSubmit = (data) => {
        Grabar(data);
    }

    return (
        <div className="d-flex justify-content-center p-2 col-lg-12 col-md-12 col-sm-0">
            <form className="form col-lg-12 col-md-12" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid ">
                    
                    {/* Campo nombre */}
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control bg-dark text-light border-secondary" id="nombre" name="nombre" 
                            {...register('nombre', {required: { value: true, message: 'Campo requerido' }})}
                        />
                    </div>

                    {/* Campo apellido */}
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control bg-dark text-light border-secondary" id="apellido" name="apellido" 
                            {...register('apellido', {required: { value: true, message: 'Campo requerido' }})}
                        />
                    </div>

                    {/* Campo fecha de nacimiento */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="fecha_nacimiento" className="col-form-label">Fecha Nacimiento</label>
                            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento"
                                {...register('fecha_nacimiento', {required: { value: true, message: 'Campo requerido' }})}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.fecha_nacimiento ? ' is-invalid' : '')}/>
                            <div className="invalid-feedback">{errors?.fecha_nacimiento?.message}</div>
                        </div>
                    </div>

                    {/* Campo fecha de fallecimiento */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="fecha_fallecimiento" className="col-form-label">Fecha Fallecimiento</label>
                            <input type="date" id="fecha_fallecimiento" name="fecha_fallecimiento"
                                {...register('fecha_fallecimiento', {})}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.fecha_fallecimiento ? ' is-invalid' : '')}/>
                            <div className="invalid-feedback">{errors?.fecha_fallecimiento?.message}</div>
                        </div>
                    </div>

                    {/* Campo bibliografia */}
                    <div className="mb-3">
                        <label htmlFor="bibliografia" className="form-label">Bibliografia</label>
                        <textarea className="form-control bg-dark text-light border-secondary " id="bibliografia" name="bibliografia" 
                            {...register('bibliografia', {required: {value: true, message: 'Campo requerido'}})}>
                        </textarea>
                    </div>

                    {/* Campo imagen */}
                    <div className="mb-3">
                        <label htmlFor="imagen" className="form-label">Imagen</label>
                        <textarea className="form-control bg-dark text-light border-secondary " id="imagen" name="imagen" 
                            {...register('imagen', {})}>
                        </textarea>
                    </div>

                    {/* Campo nacionalidades
        
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="">Nacionalidades</label>
                            
                            <div className="d-flex gap-2 justify-content-left form-control bg-dark border-dark">
                                {itemCineasta.paises.map((pais) => (
                                    <span className="badge d-flex p-2 align-items-center text-bg-warning rounded-pill">
                                        <span className="px-1">{pais.nombre}</span>
                                        <i className="fs-6 fa-solid fa-circle-xmark text-tertiary"></i>
                                    </span>
                                ))}
                                <span className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill">
                                    <i className="fa-solid fa-plus me-2"></i>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </div>
                        </div>
                    </div> */}

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-2 text-dark"><i className="fa-regular fa-floppy-disk me-2"></i>Guardar</button>
                        <button className='btn btn-dark border border-secondary px-2 mx-2 ' onClick={() => Volver()}>Volver</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CineastasForm;