import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import Pagination from "../../components/Pagination/Pagination";

const Orders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 2;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const displayedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders`);
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/orders/${orderId}`, {
        paymentStatus: newStatus,
      });

      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: newStatus } : order
        )
      );

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-page__list">
        {displayedOrders.map((order) => (
          <div key={order._id} className="orders-page__item">
            <div className="orders-page__details">
              <div>
                <div className="orders-page__info">
                  <p>
                    <strong>Họ và tên:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p>
                    <strong>Phương thức nhận hàng:</strong>{" "}
                    {order.receiveMethod === "home"
                      ? "Giao tận nơi"
                      : "Nhận tại cửa hàng"}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {order.address.specificAddress},{" "}
                    {order.address.district}, {order.address.province}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {handlePriceFormat(order.totalPrice)}
                  </p>
                </div>

                <div className="orders-page__table">
                  <div>
                    <b>Tên sản phẩm</b>
                    <b>Dung lượng</b>
                    <b>Màu</b>
                    <b>Số lượng</b>
                    <b>Giá sản phẩm</b>
                    <b>Thành tiền</b>
                  </div>

                  {order.cartItems.map((item, index) => (
                    <div key={index}>
                      <p>{item.name}</p>
                      <p>{item.capacity}</p>
                      <p>{item.selectedColor}</p>
                      <p>{item.quantity}</p>
                      <p>{handlePriceFormat(item.current_price)}</p>
                      <p>
                        {handlePriceFormat(item.current_price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <select
                className="orders-page__payment-status"
                value={order.paymentStatus}
                onChange={(e) =>
                  handlePaymentStatusChange(order._id, e.target.value)
                }
                style={{
                  color:
                    order.paymentStatus === "Chưa thanh toán"
                      ? "#71192F"
                      : "#2B641E",
                  background:
                    order.paymentStatus === "Chưa thanh toán"
                      ? "#FCE8DB"
                      : "#EDFBD8",
                }}
              >
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
              </select>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
