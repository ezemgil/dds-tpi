import React from 'react';
import '../../assets/css/InicioAdmin.css';
import authService from '../../services/auth.service';

const InicioAdmin = () => {
  // Función para obtener el nombre del usuario logueado
  const nombreUsuario = authService.getUsuarioLogueado();

  // Función para hacer la primera letra mayúscula
  const formatNombreUsuario = (nombre) => {
    if (!nombre) return '';
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }

  return (
    <div className="inicio-admin-container" style={{ marginTop: '-50px' }}>
      <h1 className="inicio-admin-heading">¡Bienvenido, {formatNombreUsuario(nombreUsuario)}!</h1>
      <p className="inicio-admin-paragraph">¡Nos alegra verte de nuevo! Aquí puedes acceder a todas las herramientas y configuraciones administrativas de CineInfo.</p>
      <div className="botones-guia" style={{ marginLeft: '-240px', marginTop: '200px'}}>
        <h2 style={{}}>A continuacion una lista de botones que encontras en las tablas del panel para administrador.</h2>
        <ul>
          <li className="boton-guia-item">
            <button className="btn btn-info btn-sm rounded-pill">
              <i className="fa-solid fa-eye text-primary-emphasis"></i>
            </button>
            <span className="guia-texto">Consultar el elemento</span>
          </li>
          <li className="boton-guia-item">
            <button className='btn btn-warning btn-sm rounded-pill'>
                <i className="fa-solid fa-pencil"></i>
            </button>
            <span className="guia-texto">Editar el elemento</span>
          </li>
          <li className="boton-guia-item">
            <button className="btn btn-danger btn-sm rounded-pill">
                <i className="fa-solid fa-trash-can text-danger-emphasis"></i>
            </button>
            <span className="guia-texto">Eliminar el elemento</span>
          </li>
          <li className="boton-guia-item">
            <button className="btn btn-danger btn-sm rounded-pill">
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
            <span className="guia-texto">Activar o desactivar el elemento</span>
          </li>
          <li className="boton-guia-item">
            <button className='btn badge btn-dark border-secondary text-light btn-sm rounded-pill btn-custom-light'>
                <i className="fa-solid fa-user-plus"></i>
            </button>
            <span className="guia-texto">Añadir rol de un cineasta</span>
          </li>
          <li className="boton-guia-item">
            <button className='btn btn-sm btn-success text-dark  rounded-pill'>
                <i className="fa-solid fa-trophy shadow"></i>
            </button>
            <span className="guia-texto">Añadir una nominación</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InicioAdmin;
