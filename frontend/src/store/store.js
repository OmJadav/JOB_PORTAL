import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './Slices/jobSlice';
import userReducer from './Slices/userSlice';
import applicationReducer from './Slices/applicationSlice';
import updateProfileReducer from './Slices/updateProfileSlice';
const store = configureStore({
    reducer: {
        jobs: jobReducer,
        user: userReducer,
        applications: applicationReducer,
        updateProfile: updateProfileReducer,
    }
})
export default store;