import axios from "axios";
import authService from "./auth.service";
import modalService from "./modal.service";

const httpService = axios.create({
    headers: {
        "Content-type": "application/json",
    },
});

httpService.interceptors.request.use(
    (request) => {
        // modalService.ScreenLock(true);
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
        // modalService.ScreenLock(false);
        return response;
    },
    async (error) => {
        console.log("Error al hacer la petición: ", error);
        // modalService.ScreenLock(false);

        switch (error.response.status) {
            case 401:
                // Solicitar un nuevo token de acceso
                try {
                    const newAccessToken = await authService.refreshToken();
                    request.headers["Authorization"] = "Bearer " + newAccessToken;
                    return httpService(request);
                } catch (refreshError) {
                    console.log("Error refreshing access token:", refreshError);
                    modalService.Alert("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
            case 403:
                console.log(error.message);
                modalService.Alert("No tiene permisos para realizar esta acción");
                break;
            case 422:
                error.message = "Ya existe un registro con los datos ingresados";
                modalService.Alert(error.message);
                break;
            default:
                break;
        }

        return Promise.reject(error);
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

// httpService.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const newAccessToken = await refreshToken();
//                 httpService.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
//                 originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
//                 return httpService(originalRequest);
//             } catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// async function requestNewToken() {
//     try {
//         const newAccessToken = await refreshToken();
//         httpService.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
//     } catch (error) {
//         console.log("Error refreshing access token:", error);
//     }
// }

export default httpService;
