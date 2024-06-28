import React from "react";

function Offline() {
    return (
        <div className="container my-5">
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">¡Atención!</h4>
                <p>El servicio no está disponible en este momento.</p>
                <hr />
                <p className="mb-0">Intente nuevamente más tarde.</p>
            </div>
        </div>
    );
}

export default Offline;
