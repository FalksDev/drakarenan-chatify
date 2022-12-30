import { configureStore } from "@reduxjs/toolkit";
import selectedConversationTypeReducer from './selectedConversationTypeSlice';

export const store = configureStore({
    reducer: {
        selectedConversationType: selectedConversationTypeReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;