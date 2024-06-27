import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import authService from "../services/auth.service";
import Logo from "../assets/img/logo/logo-01.svg";

const Login = () => {
  const navigate = useNavigate();

  const navigateToComponent = () => {
    navigate("/admin");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const { usuario, clave } = data;
    authService.login(usuario, clave, navigateToComponent);
  };

  useEffect(() => {
    authService.logout();
  }, []);

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
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className={
                  "form-control " + (errors?.usuario ? "is-invalid" : "")
                }
                placeholder="Nombre de usuario"
                {...register("usuario", {
                  required: "El nombre de usuario es requerido",
                })}
                autoFocus
              />
              {errors.usuario && (
                <div className="invalid-feedback">{errors.usuario.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="clave" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className={
                  "form-control " + (errors?.clave ? "is-invalid" : "")
                }
                placeholder="Contraseña"
                {...register("clave", {
                  required: "La contraseña es requerida",
                })}
              />
              {errors.clave && (
                <div className="invalid-feedback">{errors.clave.message}</div>
              )}
            </div>
            <button type="submit" className="btn btn-warning w-100">
              Iniciar sesión
            </button>
            <div className="text-center mt-3 ">
              <Link to="/inicio" className="text-warning">
                Volver al inicio
              </Link>
            </div>

            {isSubmitted && !isValid && (
              <div className="text-center mt-3">
                <i className="fa-solid fa-exclamation-circle me-2"></i>
                <span className="badge bg-danger me-2 p-2">
                  Por favor, revisa los campos del formulario.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
