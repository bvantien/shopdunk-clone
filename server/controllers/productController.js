import productModel from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (file, folder) => {
  if (process.env.NODE_ENV === "production") {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });
  } else {
    return cloudinary.uploader.upload(file.path, { folder });
  }
};

const addProduct = async (req, res) => {
  console.log(req.files);

  try {
    const mainFile = req.files.find((f) => f.fieldname === "image");
    const localImage =
      process.env.NODE_ENV === "production"
        ? mainFile.originalname
        : mainFile.filename;
    const cloudMain = await uploadToCloudinary(mainFile, "Images");
    const cloudImage = cloudMain.secure_url;

    let index = 0;
    const colors = [];

    while (req.body[`colors[${index}].color`]) {
      const color = req.body[`colors[${index}].color`];
      const code = req.body[`colors[${index}].code`];
      const colorImageFile = req.files.find(
        (f) => f.fieldname === `colors[${index}].colorImage`
      );
      const localColorImage =
        process.env.NODE_ENV === "production"
          ? colorImageFile.originalname
          : colorImageFile.filename;
      const cloudColor = await uploadToCloudinary(
        colorImageFile,
        "Color images"
      );
      const cloudColorImage = cloudColor.secure_url;

      colors.push({
        color: color,
        code: code,
        localColorImage,
        cloudColorImage,
      });

      index++;
    }

    const {
      name,
      category,
      series,
      capacity,
      discount,
      old_price,
      current_price,
    } = req.body;

    const newProduct = new productModel({
      localImage,
      cloudImage,
      name,
      category,
      series,
      capacity,
      colors,
      discount,
      old_price,
      current_price,
    });

    await newProduct.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    let localImage = product.localImage;
    let cloudImage = product.cloudImage;

    const newMainFile = req.files.find((f) => f.fieldname === "image");

    if (newMainFile) {
      localImage =
        process.env.NODE_ENV === "production"
          ? newMainFile.originalname
          : newMainFile.filename;
      const cloudMain = await uploadToCloudinary(newMainFile, "Images");
      cloudImage = cloudMain.secure_url;
    }

    let index = 0;
    const newColors = [];

    while (req.body[`colors[${index}].color`]) {
      const newColor = req.body[`colors[${index}].color`];
      const newCode = req.body[`colors[${index}].code`];
      const newColorImageFile = req.files.find(
        (f) => f.fieldname === `colors[${index}].colorImage`
      );

      if (newColorImageFile) {
        const localColorImage =
          process.env.NODE_ENV === "production"
            ? newColorImageFile.originalname
            : newColorImageFile.filename;
        const cloudColor = await uploadToCloudinary(
          newColorImageFile,
          "Color images"
        );
        const cloudColorImage = cloudColor.secure_url;

        newColors.push({
          color: newColor,
          code: newCode,
          localColorImage,
          cloudColorImage,
        });
      } else {
        newColors.push({
          color: newColor,
          code: newCode,
          localColorImage: product.colors[index].localColorImage,
          cloudColorImage: product.colors[index].cloudColorImage,
        });
      }

      index++;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        localImage,
        cloudImage,
        name: req.body.name || product.name,
        category: req.body.category || product.category,
        series: req.body.series || product.series,
        capacity: req.body.capacity || product.capacity,
        colors: newColors,
        discount: req.body.discount || product.discount,
        old_price: req.body.old_price || product.old_price,
        current_price: req.body.current_price || product.current_price,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
