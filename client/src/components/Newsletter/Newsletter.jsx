import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h2>Đăng ký nhận tin từ ShopDunk</h2>
      <p>Thông tin sản phẩm mới nhất và chương trình khuyến mãi</p>
      <div className="newsletter__form">
        <input type="email" placeholder="Email của bạn" />
        <button>Đăng ký</button>
      </div>
    </div>
  );
};

export default Newsletter;
