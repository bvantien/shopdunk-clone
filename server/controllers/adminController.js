import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      success: false,
      message: "Missing username or password",
    });
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: "Error" });
  }
};
