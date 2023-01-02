import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import { AcceptFriendRequestResponse, CancelFriendRequestResponse, Friend, FriendRequest, RegisterUserParams, User, UserCredentialsParams } from "./types";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.withCredentials = true

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: RegisterUserParams) => axiosClient.post("/auth/register", data, config);
export const postLoginUser = (data: UserCredentialsParams) =>  axiosClient.post(`/auth/login`, data, config);
export const postLogoutUser = () => axiosClient.post("/auth/logout", config);
export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);
export const getCheckUsername = (username: string) => axiosClient.get(`/user/check?username=${username}`, config);

export const fetchFriends = () => axiosClient.get<Friend[]>('/friend', config);

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>('/friend/request', config);

export const createFriendRequest = (username: string) =>
  axiosClient.post<FriendRequest>('/friend/request', { username }, config);

export const cancelFriendRequest = (id: number) =>
  axiosClient.delete<CancelFriendRequestResponse>(
    `/friend/request/${id}/cancel`,
    config
  );

export const acceptFriendRequest = (id: number) =>
  axiosClient.patch<AcceptFriendRequestResponse>(
    `/friend/request/${id}/accept`,
    {},
    config
  );

export const rejectFriendRequest = (id: number) =>
  axiosClient.patch<FriendRequest>(
    `/friend/request/${id}/reject`,
    {},
    config
  );

export const removeFriend = (id: number) =>
  axiosClient.delete<Friend>(`/friend/${id}/delete`, config);