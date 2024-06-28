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
                    const accessToken = await authService.refreshToken();
                    error.config.headers["Authorization"] = "Bearer " + accessToken;
                    return httpService.request(error.config); // Reintentar la petición
                } catch (refreshError) {
                    console.log("Error refreshing access token:", refreshError);
                    modalService.Alert("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                break;
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

export default httpService;
