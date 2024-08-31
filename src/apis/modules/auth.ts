import api from "../request";

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function loginRequest(params: LoginParams) {
  return api.post(`auth/login`, params);
}

export function registerRequest(params: RegisterParams) {
  return api.post(`auth/register`, params);
}

export function logoutRequest() {
  return api.post(`auth/logout`);
}
