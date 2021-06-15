import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    nutrient: {
      type: String,
      required: true,
    },
    belongsTo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
