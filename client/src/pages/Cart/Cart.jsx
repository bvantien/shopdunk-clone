import React, { useContext, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { provinces, stores } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const isProduction = import.meta.env.MODE === "production";

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    specificAddress: "",
  });

  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedReceiveMethod, setSelectedReceiveMethod] = useState("home");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { url, cartItems, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filteredStores = stores.filter(
    (store) =>
      (!selectedProvince || store.province === selectedProvince) &&
      (!selectedDistrict || store.district === selectedDistrict)
  );

  const handleContinueShopping = () => {
    setOrderSuccess(false);
    navigate("/");
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);

    const province = provinces.find(
      (province) => province.name === e.target.value
    );

    if (province) {
      setDistricts(province.districts);
    } else {
      setDistricts([]);
    }

    setSelectedDistrict("");
  };

  const increaseQuantity = (id, selectedColor, selectedImage) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id &&
        item.selectedColor === selectedColor &&
        item.selectedImage === selectedImage
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, selectedColor, selectedImage) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === id &&
          item.selectedColor === selectedColor &&
          item.selectedImage === selectedImage
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItemFromCart = (id, selectedColor, selectedImage) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item._id === id &&
            item.selectedColor === selectedColor &&
            item.selectedImage === selectedImage
          )
      )
    );
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.current_price * item.quantity,
      0
    );
  };

  const handleColorChange = (
    id,
    currentSelectedColor,
    currentSelectedImage,
    newColor,
    newColorImage
  ) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id &&
      item.selectedColor === currentSelectedColor &&
      item.selectedImage === currentSelectedImage
        ? { ...item, selectedColor: newColor, selectedImage: newColorImage }
        : item
    );

    const groupedItems = updatedItems.reduce((acc, item) => {
      const existingItem = acc.find(
        (groupedItem) =>
          groupedItem._id === item._id &&
          groupedItem.selectedColor === item.selectedColor &&
          groupedItem.selectedImage === item.selectedImage
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }

      return acc;
    }, []);

    setCartItems(groupedItems);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("gender", selectedGender);
    formData.append("name", data.name.trim());
    formData.append("phone", data.phone.trim());
    formData.append("email", data.email.trim());
    formData.append("receiveMethod", selectedReceiveMethod);

    formData.append(
      "address",
      JSON.stringify({
        province: selectedProvince,
        district: selectedDistrict,
        specificAddress:
          selectedReceiveMethod === "home"
            ? data.specificAddress.trim()
            : selectedStore,
      })
    );

    formData.append("cartItems", JSON.stringify(cartItems));
    formData.append("totalQuantity", getTotalQuantity());
    formData.append("totalPrice", getTotalPrice());

    try {
      const response = await axios.post(`${url}/api/orders`, formData);

      console.log(response.data.message);
      setOrderSuccess(true);
      setCartItems([]);
      setData({ name: "", phone: "", email: "", specificAddress: "" });
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedStore("");
    } catch (error) {
      console.log(error);
    }
  };

  if (orderSuccess) {
    return (
      <div className="order-success">
        <h3>Đặt hàng thành công!</h3>
        <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
        <button onClick={handleContinueShopping}>Tiếp tục mua sắm</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <img
          style={{ display: "block", width: "100%" }}
          src="https://newnet.vn/themes/newnet/assets/img/empty-cart.png"
          alt=""
        />
      ) : (
        <form className="cart-page__form" onSubmit={handleSubmit}>
          <div className="cart-page__info">
            <div className="cart-page__items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-page__item">
                  <div className="cart-page__item-img-wrapper">
                    <img
                      src={
                        isProduction
                          ? item.selectedImage
                          : url + "/images/" + item.selectedImage
                      }
                      alt=""
                    />
                    <span
                      onClick={() =>
                        removeItemFromCart(
                          item._id,
                          item.selectedColor,
                          item.selectedImage
                        )
                      }
                    >
                      Xóa
                    </span>
                  </div>
                  <div className="cart-page__item-info">
                    <div className="cart-page__item-name-color">
                      <span className="cart-page__item-name">{`${item.name} ${item.capacity}`}</span>
                      <span className="cart-page__item-color">
                        Màu: {item.selectedColor}
                      </span>
                      <ul>
                        {item.colors.map((itemColor, index) => (
                          <li
                            key={index}
                            style={{ background: itemColor.code }}
                            className={
                              itemColor.color === item.selectedColor
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              handleColorChange(
                                item._id,
                                item.selectedColor,
                                item.selectedImage,
                                itemColor.color,
                                isProduction
                                  ? itemColor.cloudColorImage
                                  : itemColor.localColorImage
                              )
                            }
                          ></li>
                        ))}
                      </ul>
                    </div>
                    <div className="cart-page__item-price-quantity">
                      <span className="cart-page__item-price">
                        {handlePriceFormat(item.current_price * item.quantity)}
                      </span>
                      <div className="cart-page__item-quantity">
                        <div
                          className="cart-page__quantity-btn--minus"
                          onClick={() =>
                            decreaseQuantity(
                              item._id,
                              item.selectedColor,
                              item.selectedImage
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>
                        </div>
                        <span className="cart-page__quantity">
                          {item.quantity}
                        </span>
                        <div
                          className="cart-page__quantity-btn--plus"
                          onClick={() =>
                            increaseQuantity(
                              item._id,
                              item.selectedColor,
                              item.selectedImage
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart-page__total-item">
                <span className="cart-page__total-quantity">
                  <span className="cart-page__total-label">Tạm tính </span>(
                  {getTotalQuantity()} sản phẩm):
                </span>
                <span className="cart-page__provisional-money">
                  {handlePriceFormat(getTotalPrice())}
                </span>
              </div>
            </div>

            <div>
              <div className="cart-page__customer-info">
                <h4>Thông tin khách hàng</h4>

                <div className="cart-page__gender">
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    name="gender"
                    checked={selectedGender === "male"}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  />
                  <label htmlFor="male">Anh</label>
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    name="gender"
                    checked={selectedGender === "female"}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  />
                  <label htmlFor="female">Chị</label>
                </div>

                <div className="cart-page__name-phone-email">
                  <div className="cart-page__name">
                    <label>Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleDataChange}
                      required
                    />
                  </div>

                  <div className="cart-page__phone">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={data.phone}
                      onChange={handleDataChange}
                      required
                    />
                  </div>

                  <div className="cart-page__email">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="cart-page__address">
                <h4>Hình thức nhận hàng</h4>

                <div className="cart-page__receive-method">
                  <input
                    type="radio"
                    id="home"
                    value="home"
                    name="receive"
                    checked={selectedReceiveMethod === "home"}
                    onChange={(e) => setSelectedReceiveMethod(e.target.value)}
                  />
                  <label htmlFor="home">Giao tận nơi</label>
                  <input
                    type="radio"
                    id="store"
                    value="store"
                    name="receive"
                    checked={selectedReceiveMethod === "store"}
                    onChange={(e) => setSelectedReceiveMethod(e.target.value)}
                  />
                  <label htmlFor="store">Nhận tại cửa hàng</label>
                </div>

                <div className="cart-page__address-fields">
                  <div className="cart-page__province">
                    <select
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      required
                    >
                      <option value="">Chọn tỉnh, thành phố</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cart-page__district">
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      disabled={!selectedProvince}
                      required
                    >
                      <option value="">Chọn quận, huyện</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedReceiveMethod === "home" ? (
                    <div className="cart-page__specific-address">
                      <input
                        type="text"
                        name="specificAddress"
                        placeholder="Địa chỉ cụ thể"
                        value={data.specificAddress}
                        onChange={handleDataChange}
                        required
                      />
                    </div>
                  ) : (
                    <div className="cart-page__store-list">
                      {filteredStores.map((store) => (
                        <label key={store.id}>
                          <input
                            type="radio"
                            name="selectedStore"
                            value={store.name}
                            checked={selectedStore === store.name}
                            onChange={(e) => setSelectedStore(e.target.value)}
                            required
                          />
                          {store.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cart-page__total">
              <div>
                <h4 className="cart-page__total-title">Tổng tiền:</h4>
                <span className="cart-page__total-amount">
                  {handlePriceFormat(getTotalPrice())}
                </span>
              </div>

              <button className="cart-page__order-button" type="submit">
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Cart;
