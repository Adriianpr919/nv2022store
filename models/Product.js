import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    sizes: [{ type: Object, required: true }],
    colorsOne: [{ type: Object, required: true }],
    colorsTwo: [{ type: Object, required: true }],
    image: { type: String, required: true },
    imageOne: { type: String, required: true },
    imageTwo: { type: String, required: true },
    imageThree: { type: String, required: true },
    imageFour: { type: String, required: true },
    imageFive: { type: String, required: true },
    imageSix: { type: String, required: true },
    imageSeven: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
