import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    const userToken = thunkAPI.getState()?.user?.value?.access_token;
    if (!userToken) return;

    const response = await axios.get(config.api_url + "/tasks", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: { value: [] },
  reducers: {
    setTask: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;
