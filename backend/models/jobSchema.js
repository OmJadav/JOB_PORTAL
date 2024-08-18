import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
    },
    location: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    companyName: {
        type: String,
        required: true, trim: true,
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        match: [/\b\w+@[\w.-]+\.\w{2,4}\b/gi, 'invalid email'],
    },
    jobDescription: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    benefits: {
        type: String,
    },
    salary: {
        type: String,
        required: true,
    },
    hiringMultipleCandidates: {
        type: String,
        default: "No",
        enum: ["Yes", "No"],
    },
    jobOpenings: {
        type: Number,
        default: 1,
    },
    personalWebsite: {
        type: String,
        required: true, trim: true,
    },
    jobNiche: {
        type: String,
        required: true,
    },
    newsLettersSent: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    applicationDeadline: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Open", "Closed", "On Hold"],
        default: "Open",
    },
},
    { timestamps: true }
);


const Job = mongoose.model('Job', jobSchema);

export default Job;