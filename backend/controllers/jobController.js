import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
// import User from "../models/userSchema.js";
import Job from "../models/jobSchema.js";


export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { title, contactEmail, jobType, location, companyName, jobDescription, responsibilities, qualifications, benefits, salary, hiringMultipleCandidates, jobOpenings, personalWebsite, jobNiche, newsLettersSent, jobPostedOn, applicationDeadline, status } = req.body;

    if (!title || !contactEmail || !jobType || !location || !companyName || !jobDescription || !responsibilities || !personalWebsite || !qualifications || !salary || !jobNiche) {
        return next(new ErrorHandler("Marked fields are required!", 400))
    }

    const postedBy = req.user._id;
    const job = await Job.create({ title, contactEmail, jobType, location, companyName, jobDescription, responsibilities, qualifications, benefits, salary, hiringMultipleCandidates, jobOpenings, personalWebsite, jobNiche, newsLettersSent, jobPostedOn, applicationDeadline, postedBy, status });

    res.status(201).json({
        success: true,
        message: "Job Posted Successfully"
    })

})


export const getAllJobs = catchAsyncErrors(async (req, res, next) => {

})
export const myPostedJobs = catchAsyncErrors(async (req, res, next) => {

})
export const deleteJob = catchAsyncErrors(async (req, res, next) => {

})
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {

})