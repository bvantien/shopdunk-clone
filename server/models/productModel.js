import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  color: { type: String, required: true },
  code: { type: String, required: true },
  localColorImage: { type: String, required: true },
  cloudColorImage: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  localImage: { type: String, required: true },
  cloudImage: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  series: { type: String, required: true },
  capacity: { type: String, required: true },
  colors: { type: [colorSchema], required: true },
  discount: { type: Number, default: null },
  old_price: { type: Number, default: null },
  current_price: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
