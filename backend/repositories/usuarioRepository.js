import Usuario from "../models/usuarios.js";

// Buscar usuario por nombre
export const findByUsername = async (usuario) => {
  return await Usuario.findOne({
    where: {
      nombre: usuario,
    },
  });
};
