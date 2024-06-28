import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";
import modalService from "./modal.service";

const LOGIN_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/login`;

async function login(usuario, clave, redirect) {
    let body = {
        nombre: usuario,
        clave: clave,
    };

    try {
        let response = await httpService.post(LOGIN_API_URL, body);

        if (response.data?.accessToken) {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            sessionStorage.setItem("usuario", usuario);

            if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
            redirect();
        } else {
            throw new Error("No se recibió el token de acceso");
        }
    } catch (error) {
        if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
        modalService.Alert("Usuario o contraseña incorrectos");
    }
}

function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("usuario");
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
}

function getUsuarioLogueado() {
    return sessionStorage.getItem("usuario");
}

function isLoggedIn() {
    return sessionStorage.getItem("accessToken") !== null;
}

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);

// Solicitar un nuevo token de acceso
async function refreshToken() {
    try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const response = await httpService.post(`${SERVER_CONFIG.SERVER_API_URL}/token`, {
            token: refreshToken,
        });
        const { accessToken, newRefreshToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", newRefreshToken);
        return accessToken;
    } catch (error) {
        console.log("Error al refrescar el token de acceso:", error);
        throw error;
    }
}

const authService = {
    login,
    logout,
    getUsuarioLogueado,
    subscribeUsuarioLogueado,
    isLoggedIn,
    refreshToken,
};

export default authService;
