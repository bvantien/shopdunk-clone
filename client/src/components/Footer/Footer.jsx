import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleInfo = () => setIsInfoOpen(!isInfoOpen);
  const togglePolicy = () => setIsPolicyOpen(!isPolicyOpen);
  const toggleContact = () => setIsContactOpen(!isContactOpen);

  return (
    <div className="footer">
      <div className="footer__upper">
        <div className="footer__follow-us">
          <div className="footer__logo">
            <img
              src="https://shopdunk.com/images/thumbs/0027333_logo-shopdunk.png"
              alt=""
            />
          </div>
          <div className="footer__intro">
            <p>
              Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi
              phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang
              đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho
              người dùng Việt Nam.
            </p>
            <div className="footer__support">
              <span>Tổng đài hỗ trợ:</span>
              <div>
                <span>Bảo hành: </span>
                <Link to="">
                  <span>1900.8036 (08:00 - 22:00)</span>
                </Link>
              </div>
              <div>
                <span>Mua hàng: </span>
                <Link to="">
                  <span>1900.6626 (08:00 - 22:00)</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer__social">
            <ul>
              <li>
                <Link to="">
                  <img
                    src="https://shopdunk.com/images/uploaded/icon/Face.png"
                    alt="Facebook"
                  />
                </Link>
              </li>
              <li>
                <Link to="">
                  <img
                    src="https://shopdunk.com/images/uploaded/icon/Tiktok.png"
                    alt="Tiktok"
                  />
                </Link>
              </li>
              <li>
                <Link to="">
                  <img
                    src="https://shopdunk.com/images/uploaded/icon/Zalo.png"
                    alt="Zalo"
                  />
                </Link>
              </li>
              <li>
                <Link to="">
                  <img
                    src="https://shopdunk.com/images/uploaded/icon/Youtube.png"
                    alt="Youtube"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__information">
          <div className="footer__title" onClick={toggleInfo}>
            Thông tin
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <ul className={`footer__list ${isInfoOpen ? "show" : ""}`}>
            <li>
              <a href="">Tin tức</a>
            </li>
            <li>
              <a href="">Giới thiệu</a>
            </li>
            <li>
              <a href="">Check IMEI</a>
            </li>
            <li>
              <a href="">Phương thức thanh toán</a>
            </li>
            <li>
              <a href="">Thuê điểm bán lẻ</a>
            </li>
            <li>
              <a href="">Bảo hành và sữa chữa</a>
            </li>
            <li>
              <a href="">Tuyển dụng</a>
            </li>
            <li>
              <a href="">Đánh giá chất lượng, khiếu nại</a>
            </li>
            <li>
              <a href="">Tra cứu hóa đơn điện tử</a>
            </li>
          </ul>
        </div>

        <div className="footer__policy">
          <div className="footer__title" onClick={togglePolicy}>
            Chính sách
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <ul className={`footer__list ${isPolicyOpen ? "show" : ""}`}>
            <li>
              <a href="">Thu cũ đổi mới</a>
            </li>
            <li>
              <a href="">Giao hàng</a>
            </li>
            <li>
              <a href="">Giao hàng (ZaloPay)</a>
            </li>
            <li>
              <a href="">Hủy giao dịch</a>
            </li>
            <li>
              <a href="">Đổi trả</a>
            </li>
            <li>
              <a href="">Bảo hành</a>
            </li>
            <li>
              <a href="">Dịch vụ</a>
            </li>
            <li>
              <a href="">Giải quyết khiếu nại</a>
            </li>
            <li>
              <a href="">Bảo hành thông tin</a>
            </li>
            <li>
              <a href="">Hướng dẫn thanh toán qua VNPAY</a>
            </li>
          </ul>
        </div>

        <div className="footer__address-contact">
          <div className="footer__title" onClick={toggleContact}>
            Địa chỉ & Liên hệ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <ul className={`footer__list ${isContactOpen ? "show" : ""}`}>
            <li>
              <a href="">Tài khoản của tôi</a>
            </li>
            <li>
              <a href="">Đơn đặt hàng</a>
            </li>
            <li>
              <a href="">Hệ thống cửa hàng</a>
            </li>
            <li>
              <a href="">Tìm Store trên Google Map</a>
            </li>
            <li>
              <div>
                <span>Mua hàng: </span>
                <span>1900.6626</span>
              </div>

              <div>
                <p>Nhánh 1: khu vực Hà Nội và các tỉnh phía Bắc</p>
                <p>Nhánh 2: khu vực Hồ Chí Minh và các tỉnh phía Nam</p>
                <p>Nhánh 3: Khiếu nại và góp ý</p>
              </div>

              <div>
                <span>Doanh nghiệp: </span>
                <span>0822.688.668</span>
              </div>
            </li>
            <li>
              <a href="">Bán hàng doanh nghiệp</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__lower">
        <div className="footer__info">
          <span>
            © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH &
            ĐT TP. Hà Nội cấp ngày 08/06/2016
            <br />
            Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố
            Hà Nội, Việt Nam
            <br />
            Đại diện pháp luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email:
            lienhe@shopdunk.com
          </span>
          <Link to="">
            <img
              src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
