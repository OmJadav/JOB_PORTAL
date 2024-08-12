import nodeMailer from 'nodemailer'
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';

export const sendEmail = catchAsyncErrors(async ({ email, subject, message }) => {
    const tranporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })
    const options = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: message,
    }
    await tranporter.sendMail(options);
})