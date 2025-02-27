import React, { useContext } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { StoreContext } from "../../context/StoreContext";

const ProductList = ({ items }) => {
  const isProduction = import.meta.env.MODE === "production";

  const { url } = useContext(StoreContext);

  return (
    <div className="product-list">
      {items.map((item) => (
        <ProductItem
          key={item._id}
          id={item._id}
          image={
            isProduction ? item.cloudImage : url + "/images/" + item.localImage
          }
          name={item.name}
          category={item.category}
          capacity={item.capacity}
          discount={item.discount}
          old_price={item.old_price}
          current_price={item.current_price}
        />
      ))}
    </div>
  );
};

export default ProductList;
