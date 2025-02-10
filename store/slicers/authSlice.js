import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: "",

  user: {
    username: "",
    password: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user.username = action.payload.username;
      state.user.password = action.payload.password;
    },
    clearAuth: (state) => {
      state.token = "";
      state.user.username = "";
      state.user.password = "";
      AsyncStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
