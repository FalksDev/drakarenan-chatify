import { configureStore } from "@reduxjs/toolkit";
import selectedConversationTypeReducer from './selectedConversationTypeSlice';
import friendsReducer from './friends/friendsSlice';
import conversationReducer from './conversationSlice';
import messageReducer from './messages/messageSlice';
import systemMessageReducer from './system-message/systemMessageSlice';
import groupsReducer from './groupSlice';
import messagePanelReducer from './message-panel/messagePanelSlice';

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        selectedConversationType: selectedConversationTypeReducer,
        friends: friendsReducer,
        messages: messageReducer,
        systemMessages: systemMessageReducer,
        groups: groupsReducer,
        messagePanel: messagePanelReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;