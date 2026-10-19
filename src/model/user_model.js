import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    profileImg: { type: Object },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [{
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true },
        street: { type: String, required: true },
        landmark: { type: String, required: true },
        phone: { type: Number, required: true, unique: true },
    }],
    isAddress: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], require: true },
    orderid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
    cartId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cart' }],
    verification: {
        user: {
            isDeleted: { type: Boolean, default: false },
            isVerified: { type: Boolean, default: false },
            isBlocked: { type: Boolean, default: false },
            reason: { type: String, default: null },
            opt: { type: Number, default: null },
            optATM: { type: Number, default: 3 },
            lockTime: { type: Date, default: null }
        },
        admin: {
            otp: { type: Number, default: null },
            otpATM: { type: Number, default: 3 },
        }
    },
    login_info: [{ logIn_time: Date, deviceNam: String, location: Object }]
},
    { timestamps: true }
)

export const User_model = mongoose.model("user", userSchema);


