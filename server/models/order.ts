import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    belongsTo: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    orders: {
      type: Array,
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
