import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const handlePriceFormat = (price) => {
  const priceFormatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3,
  })
    .format(price)
    .replace(".", ",")
    .replace(/\s+/g, "");

  return priceFormatted;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (order) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: "Xác nhận đơn hàng",
      html: `
          <p>Chào <strong>${order.name}</strong>,</p>
          <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
          <p><strong>Chi tiết đơn hàng:</strong></p>
          ${order.cartItems
            .map(
              (item, index) =>
                `<p><strong>Sản phẩm ${index + 1}:</strong> ${
                  item.name
                } - Dung lượng: ${item.capacity} - Màu: ${
                  item.selectedColor
                } - Số lượng: ${
                  item.quantity
                } - Giá sản phẩm: ${handlePriceFormat(
                  item.current_price
                )} - Thành tiền: ${handlePriceFormat(
                  item.current_price * item.quantity
                )}</p>`
            )
            .join("")}
          <p><strong style="color: red;">Số tiền cần thanh toán:</strong> ${handlePriceFormat(
            order.totalPrice
          )}</p>
          <p><strong>Phương thức nhận hàng:</strong> ${
            order.receiveMethod === "home"
              ? "Giao tận nơi"
              : "Nhận tại cửa hàng"
          }</p>
          <p><strong>Địa chỉ:</strong> ${order.address.specificAddress}, ${
        order.address.district
      }, ${order.address.province}</p>
          <p>Cảm ơn bạn đã đặt hàng!</p>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendConfirmationEmail };
