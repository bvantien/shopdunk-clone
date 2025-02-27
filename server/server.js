import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

connectDB();

app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
