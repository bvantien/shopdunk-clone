import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { StoreContext } from "../../context/StoreContext";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const isProduction = import.meta.env.MODE === "production";

  const { url, products, handleAddToCart } = useContext(StoreContext);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const { cate, id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item._id === id);

  const capacities =
    product &&
    products
      .filter((item) => item.name === product.name)
      .map((item) => item.capacity);

  const handleCapacityChange = (capacity) => {
    const selectedProduct = products.find(
      (item) => item.name === product.name && item.capacity === capacity
    );

    if (selectedProduct) {
      navigate(`/${cate}/${selectedProduct._id}`);
    }
  };

  const handleColorChange = (item) => {
    setSelectedColor(item.color);
    setSelectedImage(
      isProduction ? item.cloudColorImage : item.localColorImage
    );
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
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].color);
      setSelectedImage(
        isProduction
          ? product.colors[0].cloudColorImage
          : product.colors[0].localColorImage
      );
    }
  }, [product, isProduction]);

  return (
    <div className="product-details-page">
      <div className="product-details-page__image">
        <img
          src={isProduction ? selectedImage : url + "/images/" + selectedImage}
          alt=""
        />
      </div>

      <div className="product-details-page__info">
        <h1>{`${product.name} ${product.capacity}`}</h1>

        <div className="product-details-page__prices">
          {product.discount === null && product.old_price === null ? (
            <span className="product-details-page__current-price">
              {handlePriceFormat(product.current_price)}
            </span>
          ) : (
            <>
              <div className="product-details-page__discount-wrapper">
                <span className="product-details-page__discount">
                  {product.discount}%
                </span>
              </div>
              <span className="product-details-page__old-price">
                {handlePriceFormat(product.old_price)}
              </span>
              <span className="product-details-page__current-price">
                {handlePriceFormat(product.current_price)}
              </span>
            </>
          )}
        </div>

        <div className="product-details-page__capacity">
          <span>Dung lượng</span>
          <ul>
            {capacities &&
              capacities.map((item, index) => (
                <li
                  key={index}
                  className={item === product.capacity ? "active" : ""}
                  onClick={() => handleCapacityChange(item)}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>

        <div className="product-details-page__colors">
          <span>Màu: {selectedColor}</span>
          <ul>
            {product.colors.map((item, index) => (
              <li
                key={index}
                style={{ background: item.code }}
                className={item.color === selectedColor ? "active" : ""}
                onClick={() => handleColorChange(item)}
              ></li>
            ))}
          </ul>
        </div>

        <button
          className="product-details-page__button"
          onClick={() =>
            handleAddToCart(product._id, selectedColor, selectedImage)
          }
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
