import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileImg: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, default: "", trim: true },
        gender: { type: String, enum: ["male", "female", "other"], default: "other" },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: {
            type: String,
            required: function () {
                return !this.googleId && this.authProvider !== "google";
            }
        },
        googleId: { type: String, sparse: true, index: true },
        authProvider: { type: String, enum: ["local", "google"], default: "local" },
        address: [
            {
                state: { type: String },
                city: { type: String },
                pincode: { type: Number },
                street: { type: String },
                landmark: { type: String },
                phone: { type: Number }
            }
        ],
        isAddress: { type: Boolean, default: false },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        orderid: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
        cartId: [{ type: mongoose.Schema.Types.ObjectId, ref: "cart" }],
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
                otpATM: { type: Number, default: 3 }
            }
        },
        login_info: [
            {
                logIn_time: { type: Date, default: Date.now },
                deviceNam: { type: String },
                location: { type: mongoose.Schema.Types.Mixed }
            }
        ]
    },
    { timestamps: true }
);

export const User_model = mongoose.model("user", userSchema);
