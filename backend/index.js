import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { dbConnection } from './db/dbConnection.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;


app.use(cors(
    { origin: [process.env.FRONTEND_URL,] }
));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})
dbConnection();

app.use(errorMiddleware)