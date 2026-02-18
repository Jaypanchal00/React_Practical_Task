import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";

// 🔹 LocalStorage માંથી token અને user load કરો
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// 🔹 Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);

// 🔹 Initial State
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  loading: false,
  error: null,
};

// 🔹 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken || action.payload.token;
        state.user = action.payload;
        state.error = null;

        // 🔐 Save to localStorage
        localStorage.setItem("token", action.payload.accessToken || action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      })

      // ❌ Failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
