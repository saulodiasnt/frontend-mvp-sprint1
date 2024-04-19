import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    const userToken = thunkAPI.getState()?.user?.value?.access_token;

    const response = await axios.get(config.api_url + "/tasks", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMzU0ODk3NSwianRpIjoiYjEwNDYxMzQtN2YyYS00NjdmLWJiYTMtNGRhNjI4ZDFhNzg2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzEzNTQ4OTc1LCJjc3JmIjoiOTUzMGUwM2UtZWM5ZC00ODRkLThkODQtOTkwZWQ4OWFhYWFjIiwiZXhwIjoxNzEzNjM1Mzc1fQ.daTJzuH0xPVxcelnlos5sMKkgToTz1Dcx_JbixWd3jo`,
      },
    });

    return response.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialValue: { value: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default taskSlice.reducer;
