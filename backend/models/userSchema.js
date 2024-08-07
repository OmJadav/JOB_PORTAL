import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, match: [/\b\w+@[\w.-]+\.\w{2,4}\b/gi, 'invalid email'],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "password must contain at least 4 characters!"]
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['job seeker', 'employer']
    },
    niches: {
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String,
    },

    resume: {
        public_id: String,
        url: String
    },
    coverLetter: { type: String }
},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
}


const User = mongoose.model('User', userSchema);

export default User;