const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  signUpUser: async args => {
    try {
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
    } catch (err) {
      throw err;
    }
  }
  //   loginUser: () => {}
};
