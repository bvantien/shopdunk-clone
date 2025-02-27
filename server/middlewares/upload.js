import multer from "multer";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const storage = isProduction
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads");
      },
      filename: (req, file, cb) => {
        console.log("File:", file.originalname);
        cb(null, file.originalname);
      },
    });

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
