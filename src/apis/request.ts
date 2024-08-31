import axios, { AxiosError } from "axios";
// import { deleteCookie, getCookie } from "cookies-next";

export const BASE_URL = process.env.NEXT_PUBLIC_GREEN_PROJECT_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // const token = getCookie("token");
    // if (token) {
    //   config.headers.Authorization = "Bearer " + token;
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
//   (response) => {
//     if (response.data.code === 0) {
//       return response.data;
//     }
//     return {
//       errorCode: response.data.code,
//       errorMessage: response.data.message,
//     };
//   },
(response) => {
    // if (response.data) {
    //   return response.data
    // }
    // return {
    //   errorCode: response.data.code,
    //   errorMessage: response.data.message,
    // };
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
    //   window.location.replace(
    //     `/cms/login?company_cd=${getCookie("company_cd")}`
    //   );
    //   deleteCookie("token");
    }
    // check conditions to refresh token if needed
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response?.data,
    });
  }
);

export default api;