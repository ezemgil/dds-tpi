import React from "react";

const SearchBar = ({ Placeholder, busqueda, setBusqueda, buscar }) => {
  return (
    <form className="d-flex align-items-center">
      <div className="input-group me-3">
        <input
          type="text"
          className="form-control bg-dark text-white placeholder-light"
          placeholder={Placeholder}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        ></input>
        <button className="btn btn-warning" type="button" onClick={buscar}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
