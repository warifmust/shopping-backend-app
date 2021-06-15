"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../models/order"));
const cart_1 = __importDefault(require("../models/cart"));
const orderResolver = {
    getOrder: async (args) => {
        try {
            const products = await order_1.default.find({ belongsTo: args.belongsTo });
            return products;
        }
        catch (err) {
            throw err;
        }
    },
    createOrder: async (args) => {
        const listCartId = args.orderInput.orders.map((cart) => cart._id);
        try {
            await cart_1.default.deleteMany({ _id: { $in: listCartId } });
            const order = new order_1.default({
                belongsTo: args.orderInput.belongsTo,
                totalPrice: args.orderInput.totalPrice,
                status: "paid",
                orders: args.orderInput.orders,
            });
            const saveOrder = await order.save();
            return Object.assign(Object.assign({}, saveOrder), { _id: saveOrder.id, belongsTo: saveOrder.belongsTo, totalPrice: saveOrder.totalPrice, status: saveOrder.status, orders: saveOrder.orders.map((order) => {
                    return Object.assign(Object.assign({}, order), { _id: order.id, name: order.name, img: order.img, price: order.price, nutrient: order.nutrient });
                }) });
        }
        catch (err) {
            throw err;
        }
    },
    cancelOrder: async (args) => {
        try {
            const currentOrder = await order_1.default.findOne({ _id: args.id });
            await order_1.default.findOneAndUpdate({ _id: args.id }, {
                _id: currentOrder.id,
                belongsTo: currentOrder.belongsTo,
                totalPrice: currentOrder.totalPrice,
                status: "canceled",
                orders: currentOrder.orders.map((order) => {
                    return Object.assign(Object.assign({}, order), { _id: order.id, name: order.name, img: order.img, price: order.price, nutrient: order.nutrient });
                }),
            }, { upsert: true }, () => { });
            return true;
        }
        catch (e) {
            throw e;
        }
    },
};
exports.default = orderResolver;
//# sourceMappingURL=order.js.map