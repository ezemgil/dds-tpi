import Cineasta from "./cineastas.js";
import Pais from "./pais.js";
import RolesCineasta from "./rolesCineasta.js";
import TipoRol from "./tiposRol.js";

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


RolesCineasta.belongsTo(Cineasta, {
    foreignKey: "id_cineasta",
    as: "cineasta",
});

RolesCineasta.belongsTo(TipoRol, {
    foreignKey: "id_rol",
    as: "rol",
});

Cineasta.hasMany(RolesCineasta, {
    foreignKey: "id_cineasta",
    as: "roles",
});

TipoRol.hasMany(RolesCineasta, {
    foreignKey: "id_rol",
    as: "roles",
});

