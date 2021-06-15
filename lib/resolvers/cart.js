"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../models/cart"));
const cartResolver = {
    getProductsInCart: async (args) => {
        try {
            const cart = await cart_1.default.find({ belongsTo: args.belongsTo });
            return cart;
        }
        catch (e) {
            throw e;
        }
    },
    addToCart: async (args) => {
        try {
            const cart = await new cart_1.default({
                name: args.cartInput.name,
                img: args.cartInput.img,
                price: args.cartInput.price,
                nutrient: args.cartInput.nutrient,
                belongsTo: args.cartInput.belongsTo,
                status: args.cartInput.status,
            });
            const saveCart = await cart.save();
            return Object.assign(Object.assign({}, saveCart), { _id: saveCart.id, name: saveCart.name, img: saveCart.img, price: saveCart.price, nutrient: saveCart.nutrient, belongsTo: saveCart.belongsTo, status: saveCart.status });
        }
        catch (e) {
            throw e;
        }
    },
    removeProductInCart: async (args) => {
        try {
            await cart_1.default.findOneAndDelete({ _id: args.id });
            return true;
        }
        catch (e) {
            throw e;
        }
    },
};
exports.default = cartResolver;
//# sourceMappingURL=cart.js.map