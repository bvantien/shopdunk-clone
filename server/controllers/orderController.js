import orderModel from "../models/orderModel.js";
import { sendConfirmationEmail } from "../config/email.js";

const createOrder = async (req, res) => {
  try {
    const {
      gender,
      name,
      phone,
      email,
      receiveMethod,
      totalQuantity,
      totalPrice,
      paymentStatus,
    } = req.body;

    const newOrder = new orderModel({
      gender,
      name,
      phone,
      email,
      receiveMethod,
      address: JSON.parse(req.body.address),
      cartItems: JSON.parse(req.body.cartItems),
      totalQuantity,
      totalPrice,
      paymentStatus,
    });

    await newOrder.save();
    sendConfirmationEmail(newOrder);
    res.json({ success: true, message: "Order created" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { paymentStatus } = req.body;

  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment status updated",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { createOrder, getAllOrders, updatePaymentStatus };
