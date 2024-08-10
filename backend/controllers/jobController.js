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
    const { location, niche, searchKeyword } = req.query;
    const query = {};
    if (location) {
        query.location = location;
    }
    if (niche) {
        query.jobNiche = niche;
    }
    if (searchKeyword) {
        query.$or = [
            { title: { $regex: searchKeyword, $options: 'i' } },
            { companyName: { $regex: searchKeyword, $options: 'i' } },
            { jobDescription: { $regex: searchKeyword, $options: 'i' } },
        ];
    }
    const jobs = await Job.find(query);
    res.status(201).json({
        success: true,
        jobs,
        jobsCount: jobs.length,
    })
})


export const myPostedJobs = catchAsyncErrors(async (req, res, next) => {
    const myJobs = await Job.find({ postedBy: req.user._id });
    if (!myJobs || myJobs.length < 1) {
        return next(new ErrorHandler("You have not posted jobs!", 400))
    }
    res.status(201).json({
        success: true,
        myJobs,
        message: "Success",
        jobsCount: myJobs.length,
    })
})
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job doesn't exist!", 400))
    }
    if (job.postedBy !== req.user.id) {
        return next(new ErrorHandler(`You can not delete this!`))
    }
    await Job.deleteOne({ _id: id })

    res.status(201).json({
        success: true,
        job,
        message: "Job Deleted"
    })
})

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job doesn't exist!", 400))
    }
    res.status(201).json({
        success: true,
        job,
        message: "Job fetched"
    })
})