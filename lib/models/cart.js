"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const cartSchema = new Schema({
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
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
//# sourceMappingURL=cart.js.map