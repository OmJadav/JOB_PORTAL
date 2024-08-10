import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import { v2 } from 'cloudinary'
import Job from "../models/jobSchema.js";
import Application from "../models/applicationSchema.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;
    if (!name || !email || !phone || !address || !coverLetter) {
        return next(new ErrorHandler("All fields are required!", 404))
    }
    const jobSeekerInfo = { id: req.user._id, name, email, phone, address, coverLetter, role: 'job seeker' };

    const jobDetails = await Job.findById(id);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found !", 404))
    }
    const isAlreadyApplied = await Application.findOne({
        "jobInfo.id": id,
        "jobSeekerInfo.id": req.user._id,
    })
    if (isAlreadyApplied) {
        return next(new ErrorHandler("You have already applied for this job !", 404))
    }
    if (req.files && req.files.resume) {
        const { resume } = req.files;
        try {
            const cloudinaryResponse = await v2.uploader.upload(resume.tempFilePath, { folder: "Job_seeker_resume" })
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return next(new ErrorHandler("Error in Uploading Resume !!", 404))
            }
            jobSeekerInfo.resume = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        } catch (error) {
            return next(new ErrorHandler("INTERNAL SERVER ERROR", 500))
        }
    } else {
        if (req.user && !req.user.resume.url) {
            return next(new ErrorHandler("Please Upload Resume!", 404))
        }
        jobSeekerInfo.resume = {
            public_id: req.user && req.user.resume.public_id,
            url: req.user && req.user.resume.secure_url
        }
    }
    const employerInfo = {
        id: jobDetails.postedBy,
        role: "employer",
    }
    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.title,
    }

    const application = await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo,
    })
    res.status(200).json({
        success: true,
        application,
        message: "Application submitted"
    })

})
export const employerGetAllApplication = catchAsyncErrors(async (req, res, next) => {

    const { _id } = req.user;
    const applications = await Application.find({
        'employerInfo.id': _id,
        'deletedBy.employer': false,
    });
    res.status(200).json({
        success: true,
        applications,
        totalApplications: applications.length
    })
})
export const jobSeekerGetAllApplication = catchAsyncErrors(async (req, res, next) => {

    const { _id } = req.user;
    const applications = await Application.find({
        'jobSeekerInfo.id': _id,
        'deletedBy.jobSeeker': false,
    });
    res.status(200).json({
        success: true,
        applications,
        totalApplications: applications.length
    })
})
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application not found !", 404))
    }
    const { role, _id: userId } = req.user;

    switch (role) {
        case 'job seeker':
            if (String(application.jobSeekerInfo.id) !== String(userId)) {
                return next(new ErrorHandler("Unauthorized to delete this application!", 403));
            }
            application.deletedBy.jobSeeker = true;
            await application.save();
            break;
        case 'employer':
            if (String(application.employerInfo.id) !== String(userId)) {
                return next(new ErrorHandler("Unauthorized to delete this application!", 403));
            }
            application.deletedBy.employer = true;
            await application.save();
            break;
        default:
            console.log("Application delete default line occured!");
            break;
    }
    if (application.deletedBy.employer === true && application.deletedBy.jobSeeker === true) {
        await application.deleteOne({ _id: id })
    }
    res.status(200).json({
        success: true,
        message: "Application deleted!"
    })
})
