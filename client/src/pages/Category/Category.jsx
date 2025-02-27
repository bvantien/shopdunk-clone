import React, { useEffect, useContext, useState } from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import ProductList from "../../components/ProductList/ProductList";
import Carousel from "../../components/Carousel/Carousel";

const Category = () => {
  const { products } = useContext(StoreContext);

  const { cate } = useParams();

  const [items, setItems] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("Tất cả");
  const [sortValue, setSortValue] = useState("default");

  const filterItemsByCate = () => {
    return products.filter((item) => item.category === cate);
  };

  const filterSeriesByCate = () => {
    return [...new Set(filterItemsByCate().map((item) => item.series))];
  };

  const handleSortChange = (value) => {
    let sortedItems = [...filterItemsByCate()];

    if (selectedSeries !== "Tất cả") {
      sortedItems = sortedItems.filter(
        (item) => item.series === selectedSeries
      );
    }

    switch (value) {
      case "default":
        setItems(sortedItems);
        break;
      case "lowToHigh":
        setItems(
          sortedItems.sort((a, b) => a["current_price"] - b["current_price"])
        );
        break;
      case "highToLow":
        setItems(
          sortedItems.sort((a, b) => b["current_price"] - a["current_price"])
        );
        break;
      default:
        setItems(sortedItems);
    }
    setSortValue(value);
  };

  useEffect(() => {
    setItems(filterItemsByCate());
    setSeries(["Tất cả", ...filterSeriesByCate()]);
    setSelectedSeries("Tất cả");
    setSortValue("default");
  }, [cate]);

  useEffect(() => {
    const filteredBySeries =
      selectedSeries !== "Tất cả"
        ? filterItemsByCate().filter((item) => item.series === selectedSeries)
        : filterItemsByCate();

    setItems(filteredBySeries);
    setSortValue("default");
  }, [selectedSeries]);

  return (
    <div className="cate-page">
      <h1 className="category-page__title">
        {cate === "iphone"
          ? "iPhone"
          : cate === "ipad"
          ? "iPad"
          : cate === "mac"
          ? "Mac"
          : "Watch"}
      </h1>

      <Carousel customClass="border-radius" />

      <div className="category-page__filter-bar">
        <div className="category-page__filter-by-series">
          {series.map((item, index) => (
            <div
              key={index}
              className={`category-page__series-item ${
                selectedSeries === item ? "active" : ""
              }`}
              onClick={() => setSelectedSeries(item)}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="category-page__sort-select">
          <select
            value={sortValue}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">Sắp xếp theo:</option>
            <option value="lowToHigh">Giá thấp đến cao</option>
            <option value="highToLow">Giá cao đến thấp</option>
          </select>
        </div>
      </div>

      <ProductList items={items} />
    </div>
  );
};

export default Category;
