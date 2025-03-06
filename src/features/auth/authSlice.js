import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const initialState = loadFromLocalStorage("auth", {
  user: null,
  isAuthenticated: false,
  theme: "light",
  sidebar: false,
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveToLocalStorage("auth", state);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      saveToLocalStorage("auth", state);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveToLocalStorage("auth", state); // Save updated state to localStorage
    },
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
      saveToLocalStorage("auth", state); // Save updated state to localStorage
    },
  },
});

export const { login, logout, toggleTheme, toggleSidebar } = authSlice.actions;

export default authSlice.reducer;
