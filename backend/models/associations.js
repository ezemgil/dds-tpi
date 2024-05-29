import Cineasta from "./cineastas.js";
import Pais from "./pais.js";

Cineasta.belongsTo(Pais, {
    foreignKey: "nacionalidad",
    as: "pais",
});

Pais.hasMany(Cineasta, {
    foreignKey: "nacionalidad",
    as: "cineastas",
});

Cineasta.belongsTo(Pais, {
    foreignKey: "nacionalidad2",
    as: "pais2",
});


