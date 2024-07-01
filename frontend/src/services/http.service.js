import axios from "axios";
import authService from "./auth.service";
import modalService from "./modal.service";

const httpService = axios.create({
    headers: {
        "Content-type": "application/json",
    },
});

httpService.interceptors.request.use(
    async (request) => {
        modalService.BloquearPantalla(true);
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
        modalService.BloquearPantalla(false);
        return response;
    },
    async (error) => {
        console.log("Error al hacer la petición: ", error.response);
        modalService.BloquearPantalla(false);

        switch (error.response.status) {
            case 401:
                // Solicitar un nuevo token de acceso
                try {
                    window.confirm("Su sesión ha expirado, ¿desea iniciar sesión nuevamente?")
                        ? authService.refreshToken().then(() => {
                              error.config.headers["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken");
                              // Reintentar la petición original
                              return httpService.request(error.config);
                          })
                        : authService.logout();
                    break;
                } catch (refreshError) {
                    modalService.Alert("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                break;
            case 403:
                modalService.Alert("No tiene permisos para realizar esta acción");
                break;
            case 422:
                modalService.Alert(error.response.data.message);
                break;
            default:
                break;
        }

        return Promise.reject(error);
    }
);

export default httpService;
