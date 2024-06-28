import axios from "axios";
import authService from "./auth.service";

const httpService = axios.create({
    headers: {
        "Content-type": "application/json",
    },
});

httpService.interceptors.request.use(
    (request) => {
        // modalService.BloquearPantalla(true);
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            request.headers["Authorization"] = "Bearer " + accessToken;
        }
        return request;
    },
    (error) => {
        console.log("error en axios request", error);
        return Promise.reject(error);
    }
);

httpService.interceptors.response.use(
    (response) => {
        // modalService.BloquearPantalla(false);
        return response;
    },
    async (error) => {
        console.log("Error al hacer la petición: ", error);
        // modalService.BloquearPantalla(false);

        switch (error.response.status) {
            case 401:
                // Solicitar un nuevo token de acceso
                try {
                    const newAccessToken = await authService.refreshToken();
                    request.headers["Authorization"] = "Bearer " + newAccessToken;
                    return httpService(request);
                } catch (refreshError) {
                    console.log("Error refreshing access token:", refreshError);
                    window.alert("Su sesión ha expirado. Por favor, vuelva a iniciar sesión.");
                }
            case 403:
                // error.message = "usuario no autorizado para acceder a esta funcionalidad";
                window.alert("usuario no autorizado para acceder a esta funcionalidad");
                break;
            case 422:
                // error.message = "Error de validación de la base de datos";
                // window.alert("Ya existe un registro con los datos ingresados");
                break;
            default:
                // Si no hay errores, no se hace nada
                break;
        }

        return Promise.reject(error);

        //return error
        //throw new Error(error?.response?.data?.Message ?? 'Ocurrio un error');
    }
);

// Función para solicitar un nuevo token de acceso
// async function refreshToken() {
//     const refreshToken = sessionStorage.getItem("refreshToken");
//     const response = await axios.post("/token", { refreshToken });
//     const { accessToken } = response.data;
//     sessionStorage.setItem("accessToken", accessToken);
//     return accessToken;
// }

httpService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                httpService.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
                originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
                return httpService(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// async function requestNewToken() {
//     try {
//         const newAccessToken = await refreshToken();
//         httpService.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
//     } catch (error) {
//         console.log("Error refreshing access token:", error);
//     }
// }

export default httpService;
