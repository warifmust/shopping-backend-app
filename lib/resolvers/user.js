"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userResolver = {
    signUpUser: async (args) => {
        try {
            const checkUser = await user_1.default.findOne({ email: args.userInput.email });
            if (checkUser) {
                throw new Error("Email exist. Please sign up with another email.");
            }
            else {
                const hashedPassword = await bcryptjs_1.default.hash(args.userInput.password, 12);
                const user = new user_1.default({
                    name: args.userInput.name,
                    email: args.userInput.email,
                    password: hashedPassword,
                    phoneNumber: args.userInput.phoneNumber,
                });
                const saveUser = await user.save();
                return Object.assign(Object.assign({}, saveUser), { _id: saveUser.id, name: saveUser.name, email: saveUser.email, password: null, phoneNumber: saveUser.phoneNumber });
            }
        }
        catch (err) {
            throw err;
        }
    },
    loginUser: async (args, req) => {
        try {
            // if (!req.isAuth) {
            //   throw new Error("Unauthenticated user!");
            // }
            const user = await user_1.default.findOne({ email: args.email });
            if (!user) {
                throw new Error("User not exist!");
            }
            const isEqual = await bcryptjs_1.default.compare(args.password, user.password);
            if (!isEqual) {
                throw new Error("Email or Password not correct!");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, "supersecretkey", { expiresIn: "1h" });
            return {
                userId: user.id,
                token: token,
                tokenExpiration: 1,
                user: Object.assign(Object.assign({}, user), { _id: user.id, name: user.name, email: user.email, password: null, phoneNumber: user.phoneNumber }),
            };
        }
        catch (err) {
            throw err;
        }
    },
};
exports.default = userResolver;
//# sourceMappingURL=user.js.map