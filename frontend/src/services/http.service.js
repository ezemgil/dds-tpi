import axios from "axios";

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
  (error) => {
    // loguear el error
    console.log("error en axios response ", error);
    // modalService.BloquearPantalla(false);

    if (error.response.status === 401) {
      // no auntenticado
      error.message = "debe loguearse para acceder a esta funcionalidad";
    } else if (error.response.status === 403) {
      // no auntenticado
      error.message = "usuario no autorizado para acceder a esta funcionalidad";
    } else {
      error.message =
        error?.response?.data?.message ??
        "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    }
    // modalService.Alert(error.message);

    return Promise.reject(error);

    //return error
    //throw new Error(error?.response?.data?.Message ?? 'Ocurrio un error');
  }
);

// Función para solicitar un nuevo token de acceso
// async function refreshToken() {
//   const refreshToken = sessionStorage.getItem("refreshToken");
//   const response = await axios.post("/token", { refreshToken });
//   const { accessToken } = response.data;
//   sessionStorage.setItem("accessToken", accessToken);
//   return accessToken;
// }

// httpService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newAccessToken = await refreshToken();
//         axios.defaults.headers.common["Authorization"] =
//           "Bearer " + newAccessToken;
//         originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
//         return httpService(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default httpService;
