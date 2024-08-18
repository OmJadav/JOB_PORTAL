import { createSlice } from '@reduxjs/toolkit'
import { getApi } from '../../utils/getApi';
const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singleJob: {},
        myJobs: [],
    },
    reducers: {
        requestFetchAllJobs(state, action) {
            state.loading = true;
            state.error = null;
        },
        successFetchAllJobs(state, action) {
            state.loading = false;
            state.jobs = action.payload;
            state.error = null;
        },
        failureFetchAllJobs(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.jobs = state.jobs;
        },
        resetJobSlice(state, action) {
            state.error = null;
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
        // const response = await axios.get(link, { withCredentials: true });
        // dispatch(jobSlice.actions.successFetchAllJobs(response.data.jobs))
        dispatch(jobSlice.actions.successFetchAllJobs(data.jobs))
        dispatch(jobSlice.actions.clearAllErrors())
    } catch (error) {
        const errorMessage = error.data?.message || error.message;
        dispatch(jobSlice.actions.failureFetchAllJobs(errorMessage))
    }
}


export const clearAllJobErrors = () => (dispatch) => {
    dispatch(jobSlice.actions.clearAllErrors())
}
export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice())
}

export default jobSlice.reducer;