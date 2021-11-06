//?external modules

import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  bookmarks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  inCartProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
