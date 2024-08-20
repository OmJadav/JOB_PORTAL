import { createSlice } from '@reduxjs/toolkit'
import { getApi } from '../../utils/getApi';
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

export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice())
}

export default jobSlice.reducer;