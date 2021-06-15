"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const productResolver = {
    getProducts: async () => {
        try {
            const products = await product_1.default.find();
            return products;
        }
        catch (err) {
            throw err;
        }
    },
    createProduct: async (args) => {
        try {
            const product = new product_1.default({
                name: args.productInput.name,
                img: args.productInput.img,
                price: args.productInput.price,
                nutrient: args.productInput.nutrient,
            });
            const saveProduct = await product.save();
            return Object.assign(Object.assign({}, saveProduct), { _id: saveProduct.id, name: saveProduct.name, img: saveProduct.img, price: saveProduct.price, nutrient: saveProduct.nutrient });
        }
        catch (err) {
            throw err;
        }
    },
};
exports.default = productResolver;
//# sourceMappingURL=product.js.map