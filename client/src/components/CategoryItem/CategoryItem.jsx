import React from "react";
import "./CategoryItem.css";
import { Link } from "react-router-dom";
import ProductList from "../ProductList/ProductList";

const CategoryItem = ({ categoryItem }) => {
  const categoryTitles = {
    iphone: "iPhone",
    ipad: "iPad",
    mac: "Mac",
    "apple-watch": "Watch",
  };

  const title = categoryTitles[categoryItem[0].category];

  return (
    <div className="category-item">
      <h2 className="category-item__title">
        <Link to={`/${categoryItem[0].category}`}>{title}</Link>
      </h2>

      <div className="category-item__snippets">
        <ProductList items={categoryItem.slice(0, 4)} />
      </div>

      <div className="category-item__button">
        <Link to={`/${categoryItem[0].category}`}>
          {`Xem tất cả ${title}`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
