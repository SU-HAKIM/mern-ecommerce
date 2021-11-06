//?external modules
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminKey: {
    type: String,
    default: "Hakim",
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
