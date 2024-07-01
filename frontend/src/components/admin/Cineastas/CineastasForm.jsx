import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import paisService from "../../../services/pais.service";
import rolService from "../../../services/rol.service";

const CineastasForm = ({itemCineasta, volver, grabar}) => {

    const [listaPaises, setPaises] = useState([]); 
    const [urlImagen, setUrlImagen] = useState('');
    const [itemPais, setItemPais] = useState();
    const [itemPais2, setItemPais2] = useState();
    const [listaRoles, setListaRoles] = useState([]);
    const [itemRoles, setItemRoles] = useState([]);
    const [rolesModalShow, setRolesModalShow] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted }
    } = useForm({defaultValues: itemCineasta});

    const onSubmit = (data) => {
        data.imagen = urlImagen;
        data.pais = itemPais;
        data.pais2 = itemPais2;
        data.roles = itemRoles;
        console.log(data);
        grabar(data);
    }

    const handleRolesModal = () => {
        setRolesModalShow(!rolesModalShow);
    }

    const retirarRol = (id) => {
        setItemRoles(itemRoles.filter((r) => r.id !== id));
    }

    const agregarRol = (rol) => {
        let listaRolesTemp = [];
        listaRolesTemp = itemRoles.concat(rol);
        setItemRoles(listaRolesTemp);
    }

    useEffect(() => {
        setUrlImagen(itemCineasta.imagen);
        setItemPais(itemCineasta.pais);
        setItemPais2(itemCineasta.pais2);
        setItemRoles(itemCineasta.roles);
        paisService.getAll().then((response) => setPaises(response.data.paises));
        rolService.getAll().then((response) => setListaRoles(response.data));
        console.log(itemCineasta.pais?.id)
    }, []);
    
    console.log(listaRoles)
    console.log(listaPaises)

    return (
        <div className="d-flex justify-content-center p-2 col-lg-12 col-md-12 col-sm-0">
            <form className="form col-lg-12 col-md-12" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid ">

                    <div className="row">
                        {/* Campo nombre */}
                        <div className="mb-3 col">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control bg-dark text-light border-secondary" id="nombre" name="nombre" 
                                {...register('nombre', {required: { value: true, message: 'Campo requerido' }})}
                            />
                        </div>

                        {/* Campo apellido */}
                        <div className="mb-3 col">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control bg-dark text-light border-secondary" id="apellido" name="apellido" 
                                {...register('apellido', {required: { value: true, message: 'Campo requerido' }})}
                            />
                        </div>
                    </div>
                    
                    <div className="row">
                        {/* Campo fecha de nacimiento */}
                        <div className="mb-3 col">
                            <label htmlFor="fecha_nacimiento" className="col-form-label">Fecha Nacimiento</label>
                            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento"
                                {...register('fecha_nacimiento', {required: { value: true, message: 'Campo requerido' }})}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.fecha_nacimiento ? ' is-invalid' : '')}/>
                            <div className="invalid-feedback">{errors?.fecha_nacimiento?.message}</div>
                        </div>
                    
                        {/* Campo fecha de fallecimiento */}
                        <div className="mb-3 col">
                            <label htmlFor="fecha_fallecimiento" className="col-form-label">Fecha Fallecimiento</label>
                            <input type="date" id="fecha_fallecimiento" name="fecha_fallecimiento"
                                {...register('fecha_fallecimiento', {})}
                                className={'bg-dark text-light border-secondary form-control' + (errors?.fecha_fallecimiento ? ' is-invalid' : '')}/>
                            <div className="invalid-feedback">{errors?.fecha_fallecimiento?.message}</div>
                        </div>
                    </div>

                    {/* Campo roles */}
                    <div className="mb-3">
                        <label htmlFor="roles">Roles</label>
                        <div className="d-flex flex-wrap gap-2 justify-content-left">
                            {itemRoles?.map((r) => (
                                <span className="badge d-flex align-items-center text-bg-warning rounded-pill">
                                <span className="px-1">{r.nombre}</span>
                                <div className="p-1" onClick={() => retirarRol(r.id)}>
                                    <i className="fs-6 fa-solid fa-circle-xmark text-tertiary"></i>
                                </div>
                            </span>
                            ))}
                            <span className="btn badge d-flex p-2 align-items-center text-bg-dark border border-warning rounded-pill" onClick={() => handleRolesModal()}>
                                <i className="fa-solid fa-plus me-2"></i>
                                <i className="fa-solid fa-chevron-down"></i>
                            </span>
                        </div>

                        <Modal show={rolesModalShow} onHide={handleRolesModal}>
                            <Modal.Header className="bg-dark">
                                <Modal.Title>Añadir roles</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-dark">
                                <div className="rounded d-flex flex-wrap w-100">
                                    {listaRoles.map((rol) => (
                                        itemRoles.find((itemRol) => itemRol.id == rol.id) ? null :
                                        <button 
                                            key={rol.id}
                                            onClick={() => agregarRol(rol)} 
                                            className="btn bg-dark d-flex badge m-1 p-2 border border-warning rounded-pill">
                                            <span className="px-1">{rol.nombre}</span>
                                        </button>
                                    ))}
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>

                    {/* Campo biografia */}
                    <div className="mb-3 ">
                        <label htmlFor="biografia">Biografia</label>
                        <textarea className="form-control bg-dark text-light  border-secondary"  id="biografia" name="biografia" 
                            {...register('biografia', {required: {value: true, message: 'Campo requerido'}})}>
                        </textarea>
                    </div>


                    {/* Campo nacionalidades e imagenes */}
                    <div className="row mt-3">
                        {/* Campo imagen */}
                        <div className="mb-3 col">
                            <label htmlFor="imagen" className="form-label ">Imagen de cineasta (URL)</label>
                            <input 
                            // al cambiar el input se actualiza el estado de la imagen
                            onBlurCapture={(e) => setUrlImagen(e.target.value)}
                            className="form-control bg-dark text-light border-secondary " 
                            id="imagen"
                            name="imagen" 
                            {...register('imagen', {required: {value: true, message: 'Campo requerido'}})}>
                            </input>
                            <div className="w-auto d-flex mt-2">
                                <img
                                src={urlImagen !== '' ? urlImagen : 'https://via.placeholder.com/300'} 
                                alt="Poster de la pelicula" 
                                className="img-fluid rounded shadow col-lg-5 col-5 mb-3 mb-lg-3" /> 
                            </div>
                        </div>

                        {/* Campo nacionalidades */}
                        <div className="ms-3 col">
                            <label htmlFor="">Nacionalidad 1</label>
                            <select
                            name="pais" 
                            id="pais"
                            className="form-select w-100 bg-dark text-light border-secondary mb-4 mt-2"
                            // p.id == e.target.value)
                            onChange={(e) => setItemPais(listaPaises.find((p) => p.id == e.target.value))}>
                                    <option selected={true} key={0} value={0}>Seleccione un campo</option>
                                    {listaPaises?.map((p) => (
                                        <option key={p.id} selected={itemCineasta.pais?.id == p.id} value={p.id}>{p.nombre}</option>
                                    ))}
                            </select>
                            {errors?.pais && <div className="invalid-feedback">{errors?.pais?.message}</div>}
                                    
                            <label htmlFor="">Nacionalidad 2</label>
                            <select
                            name="pais2" 
                            id="pais2"
                            className="form-select w-100 bg-dark text-light border-secondary"
                            onChange={(e) => setItemPais2(listaPaises.find((p) => p.id == e.target.value))}>
                                    <option selected={itemCineasta.pais2?.id == null} disabled key={0} value={0}>Ninguno</option>
                                    {listaPaises?.map((p) => (
                                        <option selected={itemCineasta.pais2?.id == p.id} key={p.id} value={p.id}>{p.nombre}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mx-2 text-dark"><i className="fa-regular fa-floppy-disk me-2"></i>Guardar</button>
                        <button className='btn btn-dark border border-secondary px-2 mx-2 ' onClick={() => volver()}>Volver</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CineastasForm;