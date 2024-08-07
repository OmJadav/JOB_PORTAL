import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import User from "../models/userSchema.js";
import { v2 } from 'cloudinary'
import { generateToken } from "../utils/tokenGenerate.js";

export const register = catchAsyncErrors((async (req, res, next) => {
    try {
        const { name, email, password, phone, role, firstNiche, secondNiche, thirdNiche, coverLetter } = req.body;
        if (!name || !email || !password || !phone || !role) {
            return next(new ErrorHandler("Marked Filed are required!", 400))
        }
        if (role === 'job seeker' && (!firstNiche || !secondNiche || !thirdNiche)) {
            return next(new ErrorHandler("Please provide preferred Niches", 400))
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return next(new ErrorHandler("User Already Registered!", 400))
        }
        const userData = { name, email, password, phone, role, niches: { firstNiche, secondNiche, thirdNiche }, coverLetter }
        if (req.files && req.files.resume) {
            const { resume } = req.files;
            if (resume) {
                try {
                    const cloudinaryResponse = await v2.uploader.upload(resume.tempFilePath, { folder: "Job_seeker_resume" })
                    if (!cloudinaryResponse || cloudinaryResponse.error) {
                        return next(new ErrorHandler("Upload Failed!!", 500))
                    }
                    userData.resume = {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url
                    }
                } catch (error) {
                    return next(new ErrorHandler("Something went wrong to resume!! Try again!!", 500))
                }
            }
        }
        const user = await User.create(userData);
        res.status(201).json({
            success: true,
            message: "User Registered"
        })
    } catch (error) {
        next(error);
    }
}))

export const login = catchAsyncErrors((async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("enter email and password!", 400))
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorHandler("Invalid email or password!", 400))
        }
        const passwordMatched = await user.comparePassword(password);
        if (!passwordMatched) {
            return next(new ErrorHandler("Invalid email or password!", 400))
        }
        generateToken(user, 200, res, "User Logged in successfully")
    } catch (error) {
        next(error);
    }
}))

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("jwtToken", "", {
            expires: new Date(0),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "User Logged Out!",
        });
});