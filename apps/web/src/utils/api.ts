import axios, { AxiosRequestConfig } from "axios";
import { User, UserCredentialsParams } from "./types";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postLoginUser = (data: UserCredentialsParams) => 
    axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);