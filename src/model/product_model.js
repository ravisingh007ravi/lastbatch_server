import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new mongoose.Schema({
    productImgs: { type: Array, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    bankOffer: [

    ],
    quantity: { type: Number, required: true, default: 10 },
    info: {},
    category:{type:String,enum:['mobile','laptop','tab','menCloth','womenCloth']},
    commentid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],

},
    { timestamps: true }
)

export const product_model = mongoose.model("productSchema", orderSchema);


