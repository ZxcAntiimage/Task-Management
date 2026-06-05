import { MessagesState } from "@/entities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessagesState = {
    activeTab: "message",
    activeChatId: null,
}

const messagesSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload
        },
        setActiveChat: (state, action: PayloadAction<string | null>) => {
            state.activeChatId = action.payload
        }
    }
})

export const {setActiveTab, setActiveChat} = messagesSlice.actions;
export  default messagesSlice.reducer;