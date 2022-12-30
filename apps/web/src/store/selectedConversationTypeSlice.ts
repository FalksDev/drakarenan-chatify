import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { ConversationType } from "utils/types";

export interface SelectedTypeState {
    type: ConversationType;
}

const initialState: SelectedTypeState = {
    type: "private"
}

export const selectedConversationTypeSlice = createSlice({
    name: "selectedConversationType",
    initialState,
    reducers: {
        updateType: (state, action: PayloadAction<ConversationType>) => {
            state.type = action.payload;
        }
    }
});

export const selectType = (state: RootState) => {
    state.selectedConversationType.type;
}

export const { updateType } = selectedConversationTypeSlice.actions;

export default selectedConversationTypeSlice.reducer;