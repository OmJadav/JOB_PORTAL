import { createSlice } from '@reduxjs/toolkit'
import { getApi } from '../../utils/getApi';
import { sendApi } from '../../utils/sendApi';
import { deleteApi } from '../../utils/deleteApi';
const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        loading: false,
        message: null,
        singleJob: {},
        myJobs: [],
    },
    reducers: {
        requestFetchAllJobs(state, action) {
            state.loading = true;
        },
        successFetchAllJobs(state, action) {
            state.loading = false;
            state.jobs = action.payload;
        },
        requestFetchSingleJobs(state, action) {
            state.loading = true;
            state.message = null;
        },
        successFetchSingleJobs(state, action) {
            state.loading = false;
            state.singleJob = action.payload;
        },
        requestPostJob(state, action) {
            state.loading = true;
            state.message = null;
        },
        successPostJob(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        requestMyJobs(state, action) {
            state.loading = true;
            state.myJobs = [];
        },
        successMyJobs(state, action) {
            state.loading = false;
            state.myJobs = action.payload;
        },
        requestDeleteJob(state, action) {
            state.loading = true;
            state.message = null;
        },
        successDeleteJob(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        resetJobSlice(state, action) {
            state.jobs = state.jobs;
            state.loading = false;
            state.message = null;
            state.myJobs = state.myJobs;
            state.singleJob = {};
        }
    }
})

export const fetchJobs = (location, niche, searchKeyword) => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestFetchAllJobs());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/jobs/getalljobs?`;
        let queryParams = [];
        if (searchKeyword) {
            queryParams.push(`searchKeyword=${searchKeyword}`)
        }
        if (location) {
            queryParams.push(`location=${location}`)
        }
        if (niche) {
            queryParams.push(`niche=${niche}`)
        }
        link += queryParams.join("&")
        const data = await getApi(link);
        dispatch(jobSlice.actions.successFetchAllJobs(data.jobs))
    } catch (error) {
    }
}

export const fetchSingleJob = (jobId) => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestFetchSingleJobs());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/jobs/singlejob/${jobId}`;
        const data = await getApi(link);
        dispatch(jobSlice.actions.successFetchSingleJobs(data.job));
    } catch (error) {

    }
}
export const postNewJob = (formData) => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestPostJob());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/jobs/post-job`;
        const data = await sendApi(link, formData);
        dispatch(jobSlice.actions.successPostJob(data));
    } catch (error) {

    }
}
export const fetchMyJobs = () => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestMyJobs());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/jobs/mypostedjob`;
        const data = await getApi(link);
        dispatch(jobSlice.actions.successMyJobs(data));
    } catch (error) {

    }
}
export const deleteJob = (id) => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestMyJobs());
        let link = `${process.env.REACT_APP_BACKEND_URL}/api/jobs/delete-job/${id}`;
        const data = await deleteApi(link);
        dispatch(jobSlice.actions.successMyJobs());
    } catch (error) {

    }
}

export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice())
}

export default jobSlice.reducer;