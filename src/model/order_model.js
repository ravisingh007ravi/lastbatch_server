import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
},
    { timestamps: true }
)

export const Cart_model = mongoose.model("cart", cartSchema);


