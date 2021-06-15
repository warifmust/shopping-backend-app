"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootResolver = void 0;
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const cart_1 = __importDefault(require("./cart"));
const order_1 = __importDefault(require("./order"));
exports.rootResolver = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_1.default), user_1.default), product_1.default), cart_1.default), order_1.default);
//# sourceMappingURL=index.js.map