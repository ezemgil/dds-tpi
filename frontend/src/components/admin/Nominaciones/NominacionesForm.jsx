import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

import nominacionService from "../../../services/nominacion.service";
import premioService from "../../../services/premio.service";
import peliculaService from "../../../services/pelicula.service";

const NominacionesForm = ({ itemNominacion, Volver, Grabar }) => {
    const [premios, setPremios] = useState([]);
    const [itemPremio, setItemPremio] = useState({});

    const [peliculas, setPeliculas] = useState([]);
    const [itemPelicula, setItemPelicula] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ defaultValues: itemNominacion });

    const onSubmit = (data) => {
        Grabar(data);
    }

    return 

};

export default NominacionesForm;