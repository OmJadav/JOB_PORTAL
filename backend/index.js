import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary'
import { dbConnection } from './db/dbConnection.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import ApplicationRouter from './routes/applicationRoutes.js';
import { newsLetterCron } from './automation/newsLetterCron.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

//for cloudinary setup
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})


app.use(cors(
    { origin: [process.env.FRONTEND_URL,] }
));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))


app.use('/api/users', userRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/applications', ApplicationRouter)

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})
newsLetterCron()
dbConnection();

app.use(errorMiddleware)