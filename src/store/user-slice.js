import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (loginData, thunkAPI) => {
    const response = await axios.post(config.api_url + "/login", loginData);

    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerData, thunkAPI) => {
    const { data: responseRegister } = await axios.post(
      config.api_url + "/register",
      registerData
    );

    const loginData = {
      email: registerData.email,
      password: registerData.password,
    };

    const responseLogin = await axios.post(
      config.api_url + "/login",
      loginData
    );

    return responseLogin.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { value: JSON.parse(localStorage.getItem("user")) },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.value = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.value = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.value = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
