//?external modules
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  adminKey: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
