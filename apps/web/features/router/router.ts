import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    activeTab: "overview"
}

export const routerSlice = createSlice({
    name: "router",
    initialState,
    reducers:{
        changeTab: (state, action:PayloadAction<string>) => {
            state.activeTab = action.payload
        }
    }
})

export const {changeTab} = routerSlice.actions;
export default routerSlice.reducer;