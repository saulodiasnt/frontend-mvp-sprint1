import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import taskReducer from "./task-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});
