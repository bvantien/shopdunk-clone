import React, { useContext, useEffect, useState } from "react";
import "./Edit.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const isProduction = import.meta.env.MODE === "production";

const Edit = () => {
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
  const [initialData, setInitialData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${url}/api/products/${id}`);
        const product = response.data.data;

        setInitialData(product);

        setData((prevData) => ({
          ...prevData,
          image: product.localImage,
          name: product.name,
          category: product.category,
          series: product.series,
          capacity: product.capacity,
          colors: product.colors.map((color) => ({
            ...color,
            colorImage: color.localColorImage,
          })),
          discount: product.discount,
          old_price: product.old_price,
          current_price: product.current_price,
        }));

        handleCategoryChange({ target: { value: product.category } });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [id, url]);

  useEffect(() => {
    if (initialData) {
      const isDataChanged =
        (data.image && data.image instanceof File
          ? data.image.name !== initialData.localImage
          : data.image !== initialData.localImage) ||
        data.name !== initialData.name ||
        data.category !== initialData.category ||
        data.series !== initialData.series ||
        data.capacity !== initialData.capacity ||
        data.colors.length !== initialData.colors.length ||
        data.colors.some((color, index) => {
          const initialColor = initialData.colors[index];
          return (
            color.color !== initialColor.color ||
            color.code !== initialColor.code ||
            (color.colorImage && color.colorImage instanceof File
              ? color.colorImage.name !== initialColor.localColorImage
              : color.colorImage !== initialColor.localColorImage)
          );
        }) ||
        data.discount !== initialData.discount ||
        data.old_price !== initialData.old_price ||
        data.current_price !== initialData.current_price;

      setIsUpdated(isDataChanged);
    }
  }, [data, initialData]);

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
      series: prevData.category !== selectedCategory ? "" : prevData.series,
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

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    } else {
      formData.append("image", initialData.localImage);
    }

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

      if (color.colorImage && color.colorImage instanceof File) {
        formData.append(`colors[${index}].colorImage`, color.colorImage);
      } else {
        formData.append(
          `colors[${index}].colorImage`,
          color.colorImage || initialData.colors[index]?.localColorImage
        );
      }
    });

    try {
      const response = await axios.put(`${url}/api/products/${id}`, formData);

      if (response.data.success) {
        navigate("/list");
      }

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-page__back-btn" onClick={() => navigate("/list")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </div>

      <form className="edit-page__form" onSubmit={handleSubmit}>
        <div className="edit-page__image flex-col pb-20">
          <span>Product image</span>
          <label htmlFor="image">
            <img
              src={
                data.image
                  ? data.image instanceof File
                    ? URL.createObjectURL(data.image)
                    : isProduction
                    ? initialData?.cloudImage
                    : `${url}/images/${initialData?.localImage}`
                  : assets.upload
              }
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
            required={data.image instanceof File}
          />
        </div>

        <div className="edit-page__name flex-col pb-20">
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
          <div className="edit-page__category flex-col mr-20">
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
            <div className="edit-page__series flex-col mr-20">
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

          <div className="edit-page__capacity flex-col">
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

        <div className="edit-page__colors flex-col pb-20">
          <span>Colors</span>

          {data.colors.map((color, index) => (
            <div key={index} className="edit-page__color">
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
                      ? color.colorImage instanceof File
                        ? URL.createObjectURL(color.colorImage)
                        : isProduction
                        ? initialData?.colors[index]?.cloudColorImage
                        : `${url}/images/${initialData?.colors[index]?.localColorImage}`
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
                required={color.colorImage instanceof File}
              />

              <button
                className="edit-page__remove-btn"
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
            className="edit-page__add-btn"
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
          <div className="edit-page__discount flex-col mr-20">
            <span>Discount</span>
            <input
              type="number"
              min="0"
              name="discount"
              value={data.discount === null ? "" : data.discount}
              onChange={handleChange}
            />
          </div>

          <div className="edit-page__old-price flex-col mr-20">
            <span>Old price</span>
            <input
              type="number"
              min="0"
              name="old_price"
              value={data.old_price === null ? "" : data.old_price}
              onChange={handleChange}
            />
          </div>

          <div className="edit-page__current-price flex-col">
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

        <button
          className="edit-page__submit-btn"
          type="submit"
          disabled={!isUpdated}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
