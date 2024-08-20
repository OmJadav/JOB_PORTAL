import { createSlice } from '@reduxjs/toolkit'
import { sendApi } from '../../utils/sendApi';
import { getApi } from '../../utils/getApi';
import { deleteApi } from '../../utils/deleteApi';

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: {},
        loading: false,
        message: null,
        myApplications: [],
    },
    reducers: {
        requestAllApplications(state, action) {
            state.loading = true;
            state.applications = {};
            state.message = null;
        },
        successAllApplications(state, action) {
            state.loading = false;
            state.applications = action.payload;
        },
        requestMyApplications(state, action) {
            state.loading = true;
            state.applications = [];
            state.message = null;
        },
        successMyApplications(state, action) {
            state.loading = false;
            state.myApplications = action.payload;
        },
        requestPostApplication(state, action) {
            state.loading = true;
            state.message = null;
        },
        successPostApplication(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        requestDeleteApplication(state, action) {
            state.loading = true;
            state.message = null;
        },
        successDeleteApplication(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
    }
})

export const fetchAllEmployerApplications = () => async (dispatch) => {
    try {
        dispatch(applicationSlice.actions.requestAllApplications());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/applications/employer/all`;
        const data = await getApi(link);
        dispatch(applicationSlice.actions.successAllApplications(data));
    } catch (error) {
    }
}
export const fetchAllJobSeekerApplications = () => async (dispatch) => {
    try {
        dispatch(applicationSlice.actions.requestAllApplications());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/applications/job-seeker/all`;
        const data = await getApi(link);
        dispatch(applicationSlice.actions.successAllApplications(data));
    } catch (error) {
    }
}
export const postApplication = (formData, jobId) => async (dispatch) => {
    try {
        dispatch(applicationSlice.actions.requestPostApplication());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/applications/post/${jobId}`;
        const data = await sendApi(link, formData);
        dispatch(applicationSlice.actions.successPostApplication(data));

    } catch (error) {
    }
}
export const deleteApplication = (id) => async (dispatch) => {
    try {
        dispatch(applicationSlice.actions.requestDeleteApplication());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/applications/delete/${id}`;
        const data = await deleteApi(link);
        dispatch(applicationSlice.actions.successDeleteApplication(data));
    } catch (error) {

    }
}

export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
};


export default applicationSlice.reducer;
