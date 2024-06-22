import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container text-center">
        <p>&copy; 2023 CineInfo. Todos los derechos reservados.</p>
        <p>
          <Link to="/acerca-de">Acerca del proyecto</Link> |{" "}
          <a href="https://github.com/ezemgil/dds-tpi" target="_blank">
            Repositorio GitHub <i className="fa-brands fa-github"></i>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
