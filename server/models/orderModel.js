import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  name: { type: String, required: true },
  capacity: { type: String, required: true },
  quantity: { type: Number, required: true },
  current_price: { type: Number, required: true },
  selectedColor: { type: String, required: true },
  selectedImage: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  gender: { type: String, enum: ["male", "female"], required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  receiveMethod: { type: String, enum: ["home", "store"], required: true },
  address: {
    province: { type: String, required: true },
    district: { type: String, required: true },
    specificAddress: { type: String, required: true },
  },
  cartItems: [cartItemsSchema],
  totalQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Chưa thanh toán", "Đã thanh toán"],
    default: "Chưa thanh toán",
  },
  createdAt: { type: Date, default: () => new Date() },
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
