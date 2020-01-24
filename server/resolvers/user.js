const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUpUser: async args => {
    try {
      const checkUser = await User.findOne({ email: args.userInput.email });
      if (checkUser) {
        throw new Error("User exist!");
      } else {
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword,
          phoneNumber: args.userInput.phoneNumber
        });
        const saveUser = await user.save();
        return {
          ...saveUser,
          _id: saveUser.id,
          name: saveUser.name,
          email: saveUser.email,
          password: null,
          phoneNumber: saveUser.phoneNumber
        };
      }
    } catch (err) {
      throw err;
    }
  },
  loginUser: async (args, req) => {
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
        tokenExpiration: 1
      };
    } catch (err) {
      throw err;
    }
  }
};
