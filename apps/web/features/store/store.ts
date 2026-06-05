import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "../router/router"; 
import settingsReducer from "@/features/store/settings/settingsSlice"
import taskSlice from "@/features/store/tasks/taskSlice"
import taskFilesSlice from "./tasks/taskFilesSlice";
import messagesSlice from "@/features/store/messages/messagesSlince"

export const store = configureStore({
    reducer: {
        router: routerReducer,
        settings: settingsReducer,
        task: taskSlice,
        taskFiles: taskFilesSlice,
        message: messagesSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
