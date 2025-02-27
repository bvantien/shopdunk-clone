import React, { useContext } from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({
  id,
  image,
  name,
  category,
  capacity,
  discount,
  old_price,
  current_price,
}) => {
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

  return (
    <div className="product-item">
      <div className="product-item__tag">
        <img src="" alt="" />
      </div>

      <div className="product-item__image">
        <Link to={`/${category}/${id}`}>
          <img src={image} alt="" />
        </Link>
      </div>

      <div className="product-item__details">
        <h3 className="product-item__title">
          <Link to={`/${category}/${id}`}>{`${name} ${capacity}`}</Link>
        </h3>

        <div className="product-item__prices">
          <div className="product-item__prices-wrapper">
            {discount === null && old_price === null ? (
              <span className="product-item__current-price">
                {handlePriceFormat(current_price)}
              </span>
            ) : (
              <>
                <div className="product-item__discount-wrapper">
                  <span className="product-item__discount">{discount}%</span>
                </div>
                <span className="product-item__old-price">
                  {handlePriceFormat(old_price)}
                </span>
                <span className="product-item__current-price">
                  {handlePriceFormat(current_price)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
