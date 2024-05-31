import NominacionCineasta from "../models/nominacionesCineasta.js";


export async function findAll() {
    return await NominacionCineasta.findAll();
}

export async function findById(academia, premio, pelicula, cineasta, rol) {
    return await NominacionCineasta.findOne({
        where: {
            id_academia: academia,
            id_premio: premio,
            id_pelicula: pelicula,
            id_cineasta: cineasta,
            id_rol: rol
        }
    });
}

export const create = async (nominacionCineasta) => {
    return await NominacionCineasta.create(nominacionCineasta);
};

// export async function update(academia, premio, pelicula, cineasta, rol, nominacionCineasta) {
//     const result = await NominacionCineasta.findOne({
//         where: {
//             id_academia: academia,
//             id_premio: premio,
//             id_pelicula: pelicula,
//             id_cineasta: cineasta,
//             id_rol: rol
//         }
//     });
//     if (result) {
//         return await result.update(nominacionCineasta);
//     }
//     return null;
// }

export async function remove(academia, premio, pelicula, cineasta, rol) {
    const result = await NominacionCineasta.findOne({
        where: {
            id_academia: academia,
            id_premio: premio,
            id_pelicula: pelicula,
            id_cineasta: cineasta,
            id_rol: rol
        }
    });
    if (result) {
        await result.destroy();
        return true;
    }
    return false;
}