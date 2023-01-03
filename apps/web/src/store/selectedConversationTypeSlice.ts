import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { TbMessagePlus } from "react-icons/tb";
import { ConversationType } from "utils/types";

export interface SelectedTypeState {
    type: ConversationType;
    placeholderText: string;
}

const initialState: SelectedTypeState = {
    type: "private",
    placeholderText: "Search for conversations.."
}

export const selectedConversationTypeSlice = createSlice({
    name: "selectedConversationType",
    initialState,
    reducers: {
        updateType: (state, action: PayloadAction<ConversationType>) => {
            state.type = action.payload;
            if(state.type === "group") {
                state.placeholderText = "Search for groups.."
            } else {
                state.placeholderText = "Search for conversations.."
            }
        }
    }
});

export const selectType = (state: RootState) => {
    state.selectedConversationType.type;
}

export const { updateType } = selectedConversationTypeSlice.actions;

export default selectedConversationTypeSlice.reducer;