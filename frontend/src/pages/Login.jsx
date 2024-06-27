import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";

import Logo from "../assets/img/logo/logo-01.svg";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const navigateToComponent = () => {
    navigate("/admin");
  };

  const handleSubmit = async () => {
    authService.login(usuario, clave, navigateToComponent);
  };

  useEffect(() => {
    authService.logout();
  });

  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>

      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="bg-dark rounded-circle p-4">
          <img src={Logo} alt="Logo" width="100" height="100" />
        </div>
        <div className="container-fluid col-lg-4 col-md-6 col-sm-6">
          <h2 className="text-center mt-4">Iniciar sesión</h2>
          <form className="mt-4">
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={(e) => handleSubmit()}
            >
              Iniciar sesión
            </button>
            <div className="text-center mt-3 ">
              <Link to="/inicio" className="text-warning">
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
