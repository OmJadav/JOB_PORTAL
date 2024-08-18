import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './Slices/jobSlice';
import userReducer from './Slices/userSlice';
const store = configureStore({
    reducer: {
        jobs: jobReducer,
        user: userReducer,
    }
})
export default store;