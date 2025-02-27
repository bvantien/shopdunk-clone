import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const productRouter = express.Router();

productRouter.post("/", upload.any(), addProduct);

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.put("/:id", upload.any(), updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
