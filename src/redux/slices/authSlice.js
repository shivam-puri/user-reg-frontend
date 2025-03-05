import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const apiUrl = import.meta.env.VITE_API_BASE_URL

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/v1/auth/login`, userData);
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    localStorage.removeItem("userInfo");
    return null;
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
        isAuthenticated: !!localStorage.getItem("userInfo"),
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userInfo = null;
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;
