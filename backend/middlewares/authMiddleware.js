import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import User from "../models/userSchema.js";

export const authMiddleware = catchAsyncErrors(async (req, res, next) => {
    let jwtToken;
    jwtToken = req.cookies.jwtToken

    if (!jwtToken) {
        return next(new ErrorHandler("User is not Authenticated!", 400))
    }
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY,);

    req.user = await User.findById(decoded.id)
    next();

})

export const roleCheck = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`You are not authorized to access this!`))
        }
        next();
    }
}