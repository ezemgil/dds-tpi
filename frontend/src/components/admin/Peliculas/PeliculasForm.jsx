import React from "react";
import { useForm } from "react-hook-form";
import clasificacionService from "../../../services/clasificacion.service";


const PeliculasForm = ({itemPelicula, Volver, Grabar}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted } 
    } = useForm({defaultValues: itemPelicula});

    const onSubmit = (data) => {
        Grabar(data);
    }

    const [clasificaciones, setClasificaciones] = React.useState([]);
    const [clasificacionSelec, setClasificacion] = React.useState(itemPelicula.clasificacion);

    React.useEffect(() => {
        clasificacionService.getAll().then((response) => {
            setClasificaciones(response.data);
        });
    }, []);

    console.log("aeoianeoginaoieg"+ itemPelicula.calificacion);

    return (
        <div className="d-flex justify-content-center p-2">
            <form className="form mt-3 bg-color-red col-lg-7 col-md-6 col-sm-6" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid ">
                    
                    {/* Campo titulo */}
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Titulo</label>
                        <input type="text" className="form-control bg-dark text-light border-secondary" id="titulo" name="titulo" {...register('titulo', {
                                required: { value: true, message: 'Campo requerido' }
                            })}/>
                    </div>

                    {/* Campo descripcion */}
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripcion</label>
                        <textarea className="form-control bg-dark text-light border-secondary " id="descripcion" name="descripcion" 
                            {...register('descripcion', {})}>
                        </textarea>
                    </div>

                    {/* Campo calificacion */}
                    <div className="row ">
                        <div className="mb-3">
                            <label htmlFor="calificacion" className="col-form-label">Calificacion</label>
                            <input type="number" id="calificacion" name="calificacion"
                                {...register('calificacion', {
                                    required: { value: true, message: 'Campo requerido' },
                                    min: { value: 0, message: 'Puntuacion minima: 0' },
                                    max: { value: 10, message: 'Puntuacion maxima: 10' }
                                })}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.calificacion ? ' is-invalid' : '')}
                                />
                            <div className="invalid-feedback">{errors?.calificacion?.message}</div>
                        </div>
                    </div>

                    {/* Campo duracion */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="duracion" className="col-form-label">Duracion</label>
                            <input type="number" id="duracion" name="duracion"
                                {...register('duracion', {
                                    required: { value: true, message: 'Campo requerido' },
                                    min: { value: 0, message: 'Duracion minima: 0' }
                                })}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.duracion ? ' is-invalid' : '')}
                                />
                            <div className="invalid-feedback">{errors?.duracion?.message}</div>
                        </div>
                    </div>

                    {/* Campo fecha_estreno */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="fecha_estreno" className="col-form-label">Fecha Estreno</label>
                            <input type="date" id="fecha_estreno" name="fecha_estreno"
                                {...register('fecha_estreno', {required: { value: true, message: 'Campo requerido' }})}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.fecha_estreno ? ' is-invalid' : '')}/>
                            <div className="invalid-feedback">{errors?.fecha_estreno?.message}</div>
                        </div>
                    </div>

                    {/* Campo clasificacion */}

                    <div className="row">
                        <label htmlFor="clasificacion" className="col-form-label">Clasificacion</label>
                        <div className="mb-3 d-flex">
                            <span className="badge d-flex p-2 me-3 align-items-center text-bg-warning rounded-pill">
                                <span className="px-1">{clasificacionSelec.nombre}</span>
                            </span>
                            <select className="form-select bg-dark text-light border-secondary" id="clasificacion" name="clasificacion">
                                {
                                    clasificaciones.map((clas) => (
                                        <option value={clas.id}>
                                            <span className="py-4">{clas.nombre} / {clas.descripcion}</span>
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Campo generos */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="">Generos</label>
                            
                            <div className="d-flex gap-2 justify-content-left form-control bg-dark border-dark">
                                {itemPelicula.generos.map((genero) => (
                                    <span className="badge d-flex p-2 align-items-center text-bg-warning rounded-pill">
                                        <span className="px-1">{genero.nombre}</span>
                                        <i class="fs-6 fa-solid fa-circle-xmark text-tertiary"></i>
                                    </span>
                                ))}
                                <span className="badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill">
                                    <i class="fa-solid fa-plus me-2"></i>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-2">Guardar</button>
                        <button className='btn btn-secondary px-2 mx-2' onClick={() => Volver()}>Volver</button>
                    </div>
                </div>
            </form>
        </div>            
    )
}

export default PeliculasForm;