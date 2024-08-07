export const generateToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ), httpOnly: true
    };
    res.status(statusCode).cookie("jwtToken", token, options).json({
        success: true,
        user,
        message,
        token,
    })
}