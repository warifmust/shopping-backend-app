"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const orderSchema = new Schema({
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
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map