class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "INTERNAL SERVER ERROR!";

    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered!`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === 'JsonWebTokenError') {
        const message = `Token is INVALID!`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === 'TokenExpiredError') {
        const message = `Token is Expired!Login again!`;
        err = new ErrorHandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err,
    })
}

export default ErrorHandler;