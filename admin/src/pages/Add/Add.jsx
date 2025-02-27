import React, { useContext, useState } from "react";
import "./Add.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Add = () => {
  const { url } = useContext(StoreContext);

  const [data, setData] = useState({
    image: null,
    name: "",
    category: "",
    series: "",
    capacity: "",
    colors: [{ color: "", code: "", colorImage: null }],
    discount: null,
    old_price: null,
    current_price: 0,
  });

  const [seriesOptions, setSeriesOptions] = useState([]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    setData((prevData) => ({
      ...prevData,
      category: selectedCategory,
      series: "",
    }));

    if (selectedCategory === "iphone") {
      setSeriesOptions([
        "iPhone 16",
        "iPhone 15",
        "iPhone 14",
        "iPhone 13",
        "iPhone 12",
        "iPhone 11",
      ]);
    } else if (selectedCategory === "ipad") {
      setSeriesOptions(["iPad Pro M4", "iPad Air M2", "iPad 9", "iPad 10"]);
    } else if (selectedCategory === "mac") {
      setSeriesOptions(["MacBook Pro", "MacBook Air", "iMac", "Mac mini"]);
    } else if (selectedCategory === "apple-watch") {
      setSeriesOptions([
        "Apple Watch Series 10",
        "Apple Watch Ultra 2",
        "Apple Watch Series 9",
        "Apple Watch SE 2023",
      ]);
    } else {
      setSeriesOptions([]);
    }
  };

  const handleColorChange = (e, index) => {
    const { name, value } = e.target;
    const newColors = [...data.colors];

    newColors[index] = {
      ...newColors[index],
      [name.split(".")[1]]: value,
    };

    setData((prevData) => ({
      ...prevData,
      colors: newColors,
    }));
  };

  const handleColorFileChange = (e, index) => {
    const { name, files } = e.target;
    const newColors = [...data.colors];

    newColors[index] = {
      ...newColors[index],
      [name.split(".")[1]]: files[0],
    };

    setData((prevData) => ({
      ...prevData,
      colors: newColors,
    }));
  };

  const handleRemoveColor = (index) => {
    const newColors = data.colors.filter((_, i) => i !== index);
    setData((prevData) => ({
      ...prevData,
      colors: newColors,
    }));
  };

  const handleAddColor = () => {
    setData((prevData) => ({
      ...prevData,
      colors: [...prevData.colors, { color: "", code: "", colorImage: null }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("name", data.name.trim());
    formData.append("category", data.category);
    formData.append("series", data.series);
    formData.append("capacity", data.capacity.trim());
    formData.append(
      "discount",
      data.discount === 0 || data.discount === null ? "" : data.discount
    );
    formData.append(
      "old_price",
      data.old_price === 0 || data.old_price === null ? "" : data.old_price
    );
    formData.append("current_price", data.current_price);

    data.colors.forEach((color, index) => {
      formData.append(`colors[${index}].color`, color.color.trim());
      formData.append(`colors[${index}].code`, color.code.trim());
      formData.append(`colors[${index}].colorImage`, color.colorImage);
    });

    try {
      const response = await axios.post(`${url}/api/products`, formData);

      setData({
        image: null,
        name: "",
        category: "",
        series: "",
        capacity: "",
        colors: [{ color: "", code: "", colorImage: null }],
        discount: null,
        old_price: null,
        current_price: 0,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-page">
      <form className="add-page__form" onSubmit={handleSubmit}>
        <div className="add-page__image flex-col pb-20">
          <span>Product image</span>
          <label htmlFor="image">
            <img
              src={data.image ? URL.createObjectURL(data.image) : assets.upload}
              alt=""
              style={{ border: data.image ? "none" : "1px dashed #000" }}
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            hidden
            required
          />
        </div>

        <div className="add-page__name flex-col pb-20">
          <span>Product name</span>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex" }} className="pb-20">
          <div className="add-page__category flex-col mr-20">
            <span>Category</span>
            <select
              name="category"
              value={data.category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select category</option>
              <option value="iphone">iPhone</option>
              <option value="ipad">iPad</option>
              <option value="mac">Mac</option>
              <option value="apple-watch">Watch</option>
            </select>
          </div>

          {data.category && (
            <div className="add-page__series flex-col mr-20">
              <span>Series</span>
              <select
                name="series"
                value={data.series}
                onChange={handleChange}
                required
              >
                <option value="">Select series</option>
                {seriesOptions.map((series, index) => (
                  <option key={index} value={series}>
                    {series}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="add-page__capacity flex-col">
            <span>Capacity</span>
            <input
              type="text"
              name="capacity"
              value={data.capacity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="add-page__colors flex-col pb-20">
          <span>Colors</span>

          {data.colors.map((color, index) => (
            <div key={index} className="add-page__color">
              <input
                type="text"
                name={`colors[${index}].color`}
                placeholder="Color name"
                value={color.color}
                onChange={(e) => handleColorChange(e, index)}
                required
              />

              <input
                type="text"
                name={`colors[${index}].code`}
                placeholder="Color code"
                value={color.code}
                onChange={(e) => handleColorChange(e, index)}
                required
              />

              <label htmlFor={`colors[${index}].colorImage`}>
                <img
                  src={
                    color.colorImage
                      ? URL.createObjectURL(color.colorImage)
                      : assets.upload
                  }
                  alt=""
                  style={{
                    border: color.colorImage ? "none" : "1px dashed #000",
                  }}
                />
              </label>

              <input
                type="file"
                id={`colors[${index}].colorImage`}
                name={`colors[${index}].colorImage`}
                onChange={(e) => handleColorFileChange(e, index)}
                hidden
                required
              />

              <button
                className="add-page__remove-btn"
                type="button"
                onClick={() => handleRemoveColor(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          ))}

          <button
            className="add-page__add-btn"
            type="button"
            onClick={handleAddColor}
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
          </button>
        </div>

        <div style={{ display: "flex" }} className="pb-20">
          <div className="add-page__discount flex-col mr-20">
            <span>Discount</span>
            <input
              type="number"
              min="0"
              name="discount"
              value={data.discount === null ? "" : data.discount}
              onChange={handleChange}
            />
          </div>

          <div className="add-page__old-price flex-col mr-20">
            <span>Old price</span>
            <input
              type="number"
              min="0"
              name="old_price"
              value={data.old_price === null ? "" : data.old_price}
              onChange={handleChange}
            />
          </div>

          <div className="add-page__current-price flex-col">
            <span>Current price</span>
            <input
              type="number"
              min="0"
              name="current_price"
              value={data.current_price === null ? "" : data.current_price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="add-page__submit-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
