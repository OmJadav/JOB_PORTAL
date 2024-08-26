import { createSlice } from '@reduxjs/toolkit'
import { sendApi } from '../../utils/sendApi';
import { getApi } from '../../utils/getApi';

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
        requestLogin(state, action) {
            state.loading = true;
            state.isUserAuthenticated = false;
            state.user = {};
            state.message = null;
        },
        successLogin(state, action) {
            state.loading = false;
            state.isUserAuthenticated = true;
            state.user = action.payload;
            state.message = action.payload.message;
        },
        requestFetchUser(state, action) {
            state.loading = true;
            state.isUserAuthenticated = false;
            state.user = {};

        },
        successFetchUser(state, action) {
            state.loading = false;
            state.isUserAuthenticated = true;
            state.user = action.payload;
        },
        successLogout(state, action) {
            state.loading = false;
            state.isUserAuthenticated = false;
            state.user = {};
        },
        resetUserSlice(state, action) {
            state.loading = false;
            state.isUserAuthenticated = false;
            state.user = {};
        }
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
export const login = (formData) => async (dispatch) => {
    try {
        dispatch(userSlice.actions.requestLogin());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;
        const data = await sendApi(link, formData);
        dispatch(userSlice.actions.successLogin(data));
        localStorage.setItem('userId', data.user._id)
    } catch (error) {
    }
}
export const logout = () => async (dispatch) => {
    try {
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/users/logout`;
        const data = await sendApi(link);
        dispatch(userSlice.actions.successLogout());
        localStorage.clear()
    } catch (error) {
    }
}
export const fetchLoggedInUser = () => async (dispatch) => {
    try {
        dispatch(userSlice.actions.requestFetchUser());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/users/profile`;
        const data = await getApi(link);
        dispatch(userSlice.actions.successFetchUser(data));
    } catch (error) {
    }
}

export default userSlice.reducer;
