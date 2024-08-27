import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobSeekerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true, trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true, match: [/\b\w+@[\w.-]+\.\w{2,4}\b/gi, 'invalid email'],
        },
        address: {
            type: String,
        },
        phone: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['job seeker'],
        },
        resume: {
            public_id: String,
            url: String
        },
        coverLetter: { type: String, trim: true, required: true }
    },
    employerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["employer"],
            required: true,
        },
    },
    jobInfo: {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
    },
    deletedBy: {
        jobSeeker: {
            type: Boolean,
            default: false,
        },
        employer: {
            type: Boolean,
            default: false,
        },
        jobSeekerDeletedAt: Date,
        employerDeletedAt: Date,
    }

},
    { timestamps: true }
);

applicationSchema.pre('save', function (next) {
    if (this.deletedBy.jobSeeker && !this.deletedBy.jobSeekerDeletedAt) {
        this.deletedBy.jobSeekerDeletedAt = new Date();
    }
    if (this.deletedBy.employer && !this.deletedBy.employerDeletedAt) {
        this.deletedBy.employerDeletedAt = new Date();
    }
    next();
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;