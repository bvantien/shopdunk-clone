import React, { useContext } from "react";
import "./CategoryList.css";
import { StoreContext } from "../../context/StoreContext";
import CategoryItem from "../CategoryItem/CategoryItem";

const CategoryList = () => {
  const { products, categories } = useContext(StoreContext);

  const categoryList = categories.map((category) =>
    products.filter((item) => item.category === category)
  );

  return (
    <div className="category-list">
      {categoryList.map((categoryItem, index) => (
        <CategoryItem key={index} categoryItem={categoryItem} />
      ))}
    </div>
  );
};

export default CategoryList;
