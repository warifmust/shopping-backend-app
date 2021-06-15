import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userResolver = {
  signUpUser: async (args: any) => {
    try {
      const checkUser = await User.findOne({ email: args.userInput.email });
      if (checkUser) {
        throw new Error("Email exist. Please sign up with another email.");
      } else {
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword,
          phoneNumber: args.userInput.phoneNumber,
        });
        const saveUser = await user.save();
        return {
          ...saveUser,
          _id: saveUser.id,
          name: saveUser.name,
          email: saveUser.email,
          password: null,
          phoneNumber: saveUser.phoneNumber,
        };
      }
    } catch (err) {
      throw err;
    }
  },
  loginUser: async (args: any, req: any) => {
    try {
      // if (!req.isAuth) {
      //   throw new Error("Unauthenticated user!");
      // }
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("User not exist!");
      }
      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) {
        throw new Error("Email or Password not correct!");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "supersecretkey",
        { expiresIn: "1h" }
      );
      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1,
        user: {
          ...user,
          _id: user.id,
          name: user.name,
          email: user.email,
          password: null,
          phoneNumber: user.phoneNumber,
        },
      };
    } catch (err) {
      throw err;
    }
  },
};

export default userResolver;
