import { createSlice } from '@reduxjs/toolkit'
import { sendApi } from '../../utils/sendApi';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loading: false,
        isUserAuthenticated: false,
        message: null,
    },
    reducers: {
        requestRegister(state, action) {
            state.loading = true;
            state.isUserAuthenticated = false;
            state.user = {};
            state.message = null;
        },
        successRegister(state, action) {
            state.loading = false;
            state.isUserAuthenticated = true;
            state.user = action.payload;
            state.message = action.payload.message;
        },
    }
})

export const register = (formData) => async (dispatch) => {
    try {
        dispatch(userSlice.actions.requestRegister());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/users/register`;
        const data = await sendApi(link, formData);
        dispatch(userSlice.actions.successRegister(data));
    } catch (error) {
    }
}

export default userSlice.reducer;
