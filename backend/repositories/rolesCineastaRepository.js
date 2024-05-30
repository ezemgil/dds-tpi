import RolesCineasta from "../models/rolesCineasta.js";

// Buscar todos los roles de un cineasta
export const findAll = async () => {
  return await RolesCineasta.findAll({
    include: [
        {
            association: "cineasta",
            attributes: ["id", "nombre", "apellido"],
        },
        {
            association: "rol",
            attributes: ["id", "nombre"],
        }
    ],
    attributes: { exclude: ["id_cineasta", "id_rol"]} 
  });
};

// Crear un nuevo rol de cineasta
export const create = async (rolCineasta) => {
  return await RolesCineasta.create(rolCineasta);
};

// Buscar un rol de cineasta por su id
export const findRolesPorCineasta = async (cineasta) => {
  return await RolesCineasta.findAll({
    where: {
      id_cineasta: cineasta,
    },
    include: [
        {
            association: "rol",
            attributes: ["id", "nombre"],
        },
        {
            association: "cineasta",
            attributes: ["id", "nombre", "apellido"],
        }
    ],
    attributes: { exclude: ["id_cineasta", "id_rol"]}
  });
};

// Buscar cineastas por Rol
export const findCineastasPorRol = async (rol) => {
    return await RolesCineasta.findAll({
        where: {
          id_rol: rol,
        },
        include: [
            {
                association: "rol",
                attributes: ["id", "nombre"],
            },
            {
                association: "cineasta",
                attributes: ["id", "nombre", "apellido"],
            }
        ],
        attributes: { exclude: ["id_cineasta", "id_rol"]}
    });
};

export const findRolCineasta = async (rol, cineasta) => {
    return await RolesCineasta.findOne({
        where: {
            id_rol: rol,
            id_cineasta: cineasta
        },
        include: [
          {
            association: "rol",
            attributes: ["id", "nombre"]
          },
          {
              association: "cineasta",
              attributes: ["id", "nombre", "apellido"]
          }
        ],
        attributes: { exclude: ["id_cineasta", "id_rol"]}
    });
};

// Eliminar un rol de cineasta
export const remove = async (rol, cineasta) => {
  const result = await RolesCineasta.findOne({
    where: {
      id_cineasta: cineasta,
      id_rol: rol
    }
  });
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};

