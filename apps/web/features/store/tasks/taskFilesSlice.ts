import { TaskFilesState } from "@/entities";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"


const initialState: TaskFilesState = {
  items: [],
}

export const uploadFileThunk = createAsyncThunk(
  "taskFiles/uploadFile",
  async ({ id, file }: { id: string; file: File }, { dispatch }) => {
    const formData = new FormData()
    formData.append("file", file)
    for (let i = 10; i <= 100; i += 30) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      dispatch(updateProgress({ id, progress: Math.min(i, 100) }))
    }

    return { id }
  }
)

const taskFilesSlice = createSlice({
  name: "taskFiles",
  initialState,
  reducers: {
    addFileMetadata: (state, action: PayloadAction<{ id: string; name: string; size: number }>) => {
      state.items.push({
        ...action.payload,
        status: "uploading",
        progress: 0,
      })
    },
    updateProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
       const file = state.items.find((f) => f.id === action.payload.id)
        if (file) {
            file.progress = action.payload.progress
        }
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((f) => f.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.fulfilled, (state, action) => {
        const file = state.items.find((f) => f.id === action.payload.id)
        if (file) {
          file.status = "success"
          file.progress = 100
        }
      })
      .addCase(uploadFileThunk.rejected, (state, action) => {
        const file = state.items.find((f) => f.id === action.meta.arg.id)
        if (file) file.status = "failed"
      })
  },
})

export const { addFileMetadata, updateProgress, removeFile } = taskFilesSlice.actions
export default taskFilesSlice.reducer
