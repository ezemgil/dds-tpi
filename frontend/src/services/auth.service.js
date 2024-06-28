import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const LOGIN_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/login`;

async function login(usuario, clave, redirect) {
    let body = {
        nombre: usuario,
        clave: clave,
    };

    let response = await httpService.post(LOGIN_API_URL, body);

    if (response.data?.accessToken) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
        sessionStorage.setItem("usuario", usuario);

        if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
        {
            redirect();
        }
    } else {
        if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
        alert("Usuario o clave incorrectos");
        // modalService.Alert("Usuario o clave incorrectos");
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
        const response = await httpService.post("/token", { refreshToken });
        const { accessToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        console.log("Se ha refrescado el token de acceso");
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
