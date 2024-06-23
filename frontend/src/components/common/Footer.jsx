import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container text-center">
        <span className="text-secondary">
          <Link to="/inicio">Inicio</Link> |{" "}
          <Link to="/peliculas">Películas</Link> |{" "}
          <Link to="/cineastas">Cineastas</Link> |{" "}
          <Link to="/acerca-de">Acerca del proyecto</Link> |{" "}
          <Link to="/acerca-de">Acerca del proyecto</Link> |{" "}
          <a href="https://github.com/ezemgil/dds-tpi" target="_blank">
            Repositorio GitHub <i className="fa-brands fa-github"></i>
          </a>
        </span>
        <span className="d-block">
          <i className="fa-solid fa-ticket text-secondary"></i>
        </span>
        <p>&copy; 2024 CineInfo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
