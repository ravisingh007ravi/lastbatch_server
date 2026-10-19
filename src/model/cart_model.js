import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' }
},
    { timestamps: true }
)

export const cart_model = mongoose.model("cartSchema", orderSchema);


