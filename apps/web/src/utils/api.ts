import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import { AcceptFriendRequestResponse, AddGroupRecipientParams, CancelFriendRequestResponse, Conversation, ConversationType, CreateConversationParams, CreateGroupParams, CreateMessageParams, DeleteGroupMessageParams, DeleteGroupMessageResponse, DeleteMessageParams, DeleteMessageResponse, EditMessagePayload, FetchGroupMessagePayload, FetchMessagePayload, Friend, FriendRequest, Group, GroupMessageType, MessageType, RegisterUserParams, RemoveGroupRecipientParams, UpdateGroupDetailsPayload, UpdateGroupOwnerParams, User, UserCredentialsParams } from "./types";

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

  
export const getConversations = () =>
axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationById = (id: number) =>
axiosClient.get<Conversation>(`/conversations/${id}`, config);

export const getConversationMessages = (conversationId: number) =>
axiosClient.get<FetchMessagePayload>(
  `/conversations/${conversationId}/messages`,
  config
);

export const createMessage = (
id: string,
type: ConversationType,
data: FormData
) => {
const url =
  type === 'private'
    ? `/conversations/${id}/messages`
    : `/groups/${id}/messages`;
return axiosClient.post(url, data, {
  headers: { 'Content-Type': 'multipart/form-data' },
  ...config,
});
};

export const postNewConversation = (data: CreateConversationParams) =>
axiosClient.post<Conversation>(`/conversations`, data, config);

export const deleteMessage = ({ id, messageId }: DeleteMessageParams) =>
axiosClient.delete<DeleteMessageResponse>(
  `/conversations/${id}/messages/${messageId}`,
  config
);

export const editMessage = ({ content, id, messageId }: EditMessagePayload) =>
  axiosClient.patch<MessageType>(
    `/conversations/${id}/messages/${messageId}`,
    { content },
    config
  );

  export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupById = (id: number) =>
  axiosClient.get<Group>(`/groups/${id}`, config);

export const fetchGroupMessages = (id: number) =>
  axiosClient.get<FetchGroupMessagePayload>(`/groups/${id}/messages`, config);

export const postGroupMessage = ({ id, content }: CreateMessageParams) =>
  axiosClient.post(`/groups/${id}/messages`, { content }, config);

export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const createGroup = (params: CreateGroupParams) =>
  axiosClient.post(`/groups`, params, config);

export const deleteGroupMessage = ({
  id,
  messageId,
}: DeleteGroupMessageParams) =>
  axiosClient.delete<DeleteGroupMessageResponse>(
    `/groups/${id}/messages/${messageId}`,
    config
  );

export const editGroupMessage = ({
  content,
  id,
  messageId,
}: EditMessagePayload) =>
  axiosClient.patch<GroupMessageType>(
    `/groups/${id}/messages/${messageId}`,
    { content },
    config
  );

export const addGroupRecipient = ({ id, username }: AddGroupRecipientParams) =>
  axiosClient.post(`/groups/${id}/recipients`, { username }, config);

export const removeGroupRecipient = ({
  id,
  userId,
}: RemoveGroupRecipientParams) =>
  axiosClient.delete<Group>(`/groups/${id}/recipients/${userId}`, config);

export const updateGroupOwner = ({ id, newOwnerId }: UpdateGroupOwnerParams) =>
  axiosClient.patch(`/groups/${id}/owner`, { newOwnerId }, config);

export const leaveGroup = (id: number) =>
  axiosClient.delete(`/groups/${id}/recipients/leave`, config);


export const updateGroupDetails = ({ id, data }: UpdateGroupDetailsPayload) =>
    axiosClient.patch<Group>(`/groups/${id}/details`, data, config);
