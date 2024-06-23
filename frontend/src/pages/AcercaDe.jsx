import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const AcercaDe = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>Acerca de</title>
      </Helmet>

      <div className="container my-5 d-flex flex-column gap-4">
        <div className="">
          <h1 className="display-4">Acerca de</h1>
          <p className="lead">
            <b className="text-warning">CineInfo</b> es una aplicación web
            desarrollada por estudiantes de la carrera de Ingeniería en Sistemas
            de Información de la Universidad Tecnológica Nacional,{" "}
            <a
              href="https://www.frc.utn.edu.ar/"
              className="text-decoration-none text-info"
              target="_blank"
            >
              Facultad Regional Córdoba (UTN FRC)
              <i className="fa-solid fa-external-link-alt fs-6 ms-1"></i>
            </a>
            , en el marco de la materia de Desarrollo de Software.
          </p>
          <p className="lead">
            Este proyecto grupal tiene como objetivo implementar un conjunto de
            <b className="text-info"> Web APIs</b> o{" "}
            <b className="text-info">REST APIs</b> utilizando{" "}
            <b className="text-success">Node.js</b>,{" "}
            <b className="text-success">Express</b> y{" "}
            <b className="text-success">Sequelize</b>. Este sistema de gestión
            de películas que permite a los usuarios registrados acceder a
            información sobre películas, cineastas, premios y nominaciones.
          </p>
          <p className="lead">
            Las APIs implementan los métodos{" "}
            <b className="text-secondary">CRUD</b> (Create, Read, Update,
            Delete) y se han realizado pruebas unitarias para asegurar su
            correcto funcionamiento.
          </p>
        </div>
        <div className="">
          <h2 className="display-5">Frontend</h2>
          <p className="lead">
            El frontend de la aplicación se ha desarrollado utilizando{" "}
            <b className="text-info">React</b>, una biblioteca de JavaScript
            creada por Facebook para construir interfaces de usuario. Se han
            utilizado las siguientes tecnologías y librerías:
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark text-white border-warning">
              <span className="text-warning">React Router</span> para la
              navegación entre páginas.
            </li>
            <li className="list-group-item bg-dark text-white border-warning">
              <span className="text-warning">React Helmet</span> para la gestión
              de metadatos.
            </li>
            <li className="list-group-item bg-dark text-white border-warning">
              <span className="text-warning">Bootstrap</span> para el diseño y
              maquetación.
            </li>
            <li className="list-group-item bg-dark text-white border-warning">
              <span className="text-warning">Axios</span> para realizar
              peticiones HTTP a las APIs.
            </li>
            <li className="list-group-item bg-dark text-white border-warning">
              <span className="text-warning">Font Awesome</span> para los
              iconos.
            </li>
            <li className="list-group-item bg-dark text-white border-warning">
              <a
                className="text-warning text-decoration-none"
                href="https://github.com/SlavkoPekaric/Country-Flags-Responsive-CSS-Sprite"
                target="_blank"
              >
                Country Flags Responsive CSS Sprite
                <i className="fa-solid fa-external-link-alt fs-6 ms-1"></i>
              </a>{" "}
              para las imágenes de las banderas de los países.
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="display-5">Backend</h2>
          <p className="lead">
            El backend de la aplicación se ha desarrollado utilizando{" "}
            <b className="text-success">Node.js</b>, un entorno de ejecución de
            JavaScript que permite ejecutar código JavaScript en el servidor. Se
            han utilizado las siguientes tecnologías y librerías:
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">Express</span> como framework de
              Node.js.
            </li>
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">Sequelize</span> como ORM (Object
              Relational Mapping) para la gestión de la base de datos.
            </li>
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">SQLite</span> como motor de base de
              datos.
            </li>
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">Jest </span>y
              <span className="text-success"> Supertest </span>
              para las pruebas unitarias.
            </li>
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">jsonwebtoken</span> para la
              generación y verificación de tokens JWT.
            </li>
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">winston</span> para el registro de
              logs.
            </li>
            <li className="list-group-item bg-dark text-white border-success">
              <span className="text-success">bcrypt</span> para el hashing de
              contraseñas.
            </li>
          </ul>
          <p className="lead mt-2">
            La base de datos se ha diseñado utilizando{" "}
            <b className="text-success">SQLite</b>, un motor de base de datos
            relacional que se almacena en un archivo. Se han implementado
            relaciones entre las tablas para garantizar la integridad de los
            datos.
          </p>
          <p className="lead">
            Se ha implementado una arquitectura organizada por capas, que
            incluye controladores para la gestión de las peticiones, servicios
            para la lógica de negocio, y repositorios para la interacción con la
            base de datos. Además, se han utilizado los modelos de Sequelize
            para definir y gestionar los datos en la base de datos, asegurando
            así una estructura robusta y escalable. El enrutamiento adecuado
            complementa esta estructura, facilitando la navegación y el manejo
            de las distintas rutas de la aplicación.
          </p>
          <p className="lead">
            Además, se ha implementado un sistema de autenticación basado en
            tokens JWT y se han registrado los logs de las peticiones y
            respuestas en un archivo <code>.log</code>.
          </p>
        </div>
        <div className="">
          <h2 className="display-5">Autores</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark text-white border-info">
              <span className="">Gil, Matías </span>|{" "}
              <span className="text-secondary">
                Perfil de GitHub:{" "}
                <a
                  href="https://github.com/ezemgil"
                  className="text-warning text-decoration-none"
                >
                  ezemgil <i className="fa-brands fa-github"></i>
                </a>
              </span>
            </li>
            <li className="list-group-item bg-dark text-white border-info">
              <span className="">Gutiérrez, Agustín </span>|{" "}
              <span className="text-secondary">
                Perfil de GitHub:{" "}
                <a
                  href="https://github.com/agusgut"
                  className="text-warning text-decoration-none"
                >
                  ezemgil <i className="fa-brands fa-github"></i>
                </a>
              </span>
            </li>
            <li className="list-group-item bg-dark text-white border-info">
              <span className="">Witt, Facundo </span>|{" "}
              <span className="text-secondary">
                Perfil de GitHub:{" "}
                <a
                  href="https://github.com/witt97848"
                  className="text-warning text-decoration-none"
                >
                  ezemgil <i className="fa-brands fa-github"></i>
                </a>
              </span>
            </li>
          </ul>
          <p className="lead mt-2 fs-6">
            El código fuente de la aplicación se encuentra disponible en{" "}
            <a
              className="text-decoration-none text-info"
              href="https://github.com/ezemgil/dds-tpi/"
              target="_blank"
            >
              GitHub
              <i className="fa-solid fa-external-link-alt fs-6 ms-1"></i>
            </a>
            .
          </p>
          <p className="lead fs-6 text-info-emphasis">
            La finalidad exclusiva de esta aplicación es educativa y no tiene
            propósitos comerciales. Todos los datos empleados en la aplicación
            son ficticios y no se corresponden con ninguna base de datos real.
          </p>
        </div>
      </div>
    </>
  );
};

export default AcercaDe;
