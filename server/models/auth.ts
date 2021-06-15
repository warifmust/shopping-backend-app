import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
