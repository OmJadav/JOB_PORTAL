import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateApi } from "../../utils/updateApi";
const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: {
        loading: false,
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

        requestUpdatePassword(state, action) {
            state.loading = true;
        },
        successUpdatePassword(state, action) {
            state.error = null;
            state.loading = false;
            state.isUpdated = true;
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
        const link = `${process.env.REACT_APP_BACKEND_URL}/api/users/update/profile`;
        const data = await updateApi(link, formData);
        dispatch(updateProfileSlice.actions.successUpdateProfile(data));
    } catch (error) {
    }
};
export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updateProfileSlice.actions.requestUpdatePassword());
        const link = `${process.env.REACT_APP_BACKEND_URL}/api/users/update/password`;
        const data = await updateApi(link, formData);
        dispatch(updateProfileSlice.actions.successUpdatePassword(data));
    } catch (error) {
    }
};



export const resetProfileAfterUpdate = () => (dispatch) => {
    dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;