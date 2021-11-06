//?external modules
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  available: {
    type: String,
  },
  rating: {
    type: String,
  },
});

const product = mongoose.model("Product", productSchema);

export default product;
