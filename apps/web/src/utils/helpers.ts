import { Conversation, FriendRequest, FriendRequestDetailsType, PostWithCallbackParams, User } from "./types";

export async function postWithCallback(params: PostWithCallbackParams) {
    try {
        const test = await params.postFunction();
        params.onSuccess?.();
    } catch(err) {
        console.log(err);
        params.onError?.();
    }
}

export const getFriendRequestDetails = (
    { receiver, sender }: FriendRequest,
    user?: User
  ): FriendRequestDetailsType =>
    user?.id === receiver.id
      ? {
          status: 'Incoming Friend Request',
          displayName: `${sender.firstName} ${sender.lastName}`,
          user: sender,
          incoming: true,
        }
      : {
          status: 'Outgoing Friend Request',
          displayName: `${receiver.firstName} ${receiver.lastName}`,
          user: receiver,
          incoming: false,
        };

        export const getRecipientFromConversation = (
            conversation?: Conversation,
            user?: User
          ) => {
            return user?.id === conversation?.creator.id
              ? conversation?.recipient
              : conversation?.creator;
          };