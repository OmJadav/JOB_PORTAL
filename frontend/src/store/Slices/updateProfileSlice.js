import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: false,
    },
    reducers: {
        requestUpdateProfile(state, action) {
            state.loading = true;
        },
        successUpdateProfile(state, action) {
            state.error = null;
            state.loading = false;
            state.isUpdated = true;
        },
        failedUpdateProfile(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.isUpdated = false;
        },
        requestUpdatePassword(state, action) {
            state.loading = true;
        },
        successUpdatePassword(state, action) {
            state.error = null;
            state.loading = false;
            state.isUpdated = true;
        },
        failedUpdatePassword(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.isUpdated = false;
        },
        profileResetAfterUpdate(state, action) {
            state.error = null;
            state.isUpdated = false;
            state.loading = false;
        },
    },
});

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch(updateProfileSlice.actions.requestUpdateProfile());
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/update/profile`
            ,
            formData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(updateProfileSlice.actions.successUpdateProfile());
    } catch (error) {
        dispatch(
            updateProfileSlice.actions.failedUpdateProfile(
                error.response.data.message || "Failed to update profile."
            )
        );
    }
};
export const updatePassword = (data) => async (dispatch) => {
    dispatch(updateProfileSlice.actions.requestUpdatePassword());
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/update/password`,
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(updateProfileSlice.actions.successUpdatePassword());
    } catch (error) {
        dispatch(
            updateProfileSlice.actions.failedUpdatePassword(
                error.response.data.message || "Failed to update password."
            )
        );
    }
};

export const clearAllUpdateProfileErrors = () => (dispatch) => {
    dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;