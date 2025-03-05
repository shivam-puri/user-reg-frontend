import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserDetails = createAsyncThunk(
    "user/fetchUserDetails",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/user/details`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user details");
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "user/updateUserDetails",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiUrl}/api/v1/user/update`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update user details");
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    "user/updateUserPassword",
    async ({ passwordData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiUrl}/api/v1/user/update-password`, passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update password");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/v1/user/delete`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete user");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.userDetails = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
