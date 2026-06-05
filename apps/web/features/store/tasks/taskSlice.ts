import { TaskSliceState, TaskState } from "@/entities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: TaskSliceState ={
 tasks: {},
 selectedTaskId: null

}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        initTask: (state, action: PayloadAction<{ id: string; title: string; progressNum: number; progressName: string }>) => {
            const { id, title, progressNum, progressName } = action.payload;
            if (!state.tasks[id]) {
                state.tasks[id] = { title, progressNum, progressName };
            }
        },
        updateProgress: (state, action: PayloadAction<{ id: string; value: number }>) => {
            const { id, value } = action.payload;
            if (state.tasks[id]) {
                state.tasks[id].progressNum = value;
                state.tasks[id].progressName = `${value}%`;
            }
        },
        selectTask: (state, action: PayloadAction<string>) => {
            state.selectedTaskId = action.payload;
        }
    }
});

export const { initTask, updateProgress, selectTask } = taskSlice.actions;
export default taskSlice.reducer;
