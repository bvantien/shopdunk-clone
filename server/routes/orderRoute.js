import express from "express";
import multer from "multer";
import {
  createOrder,
  getAllOrders,
  updatePaymentStatus,
} from "../controllers/orderController.js";

const upload = multer();

const orderRouter = express.Router();

orderRouter.post("/", upload.none(), createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.put("/:id", updatePaymentStatus);

export default orderRouter;
