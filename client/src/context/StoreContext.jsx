import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = () => {
    if (products && products.length > 0) {
      setCategories(
        [...new Set(products.map((item) => item.category))].reverse()
      );
    }
  };

  const handleAddToCart = (idItem, selectedColor, selectedImage) => {
    const product = products.find((item) => item._id === idItem);

    if (product) {
      setCartItems((prevItems) => {
        const existingProduct = prevItems.find(
          (item) =>
            item._id === product._id &&
            item.selectedColor === selectedColor &&
            item.selectedImage === selectedImage
        );

        if (existingProduct) {
          return prevItems.map((item) =>
            item._id === product._id &&
            item.selectedColor === selectedColor &&
            item.selectedImage === selectedImage
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [
          ...prevItems,
          {
            ...product,
            quantity: 1,
            selectedColor: selectedColor,
            selectedImage: selectedImage,
          },
        ];
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getCategories();
  }, [products]);

  const contextValue = {
    url,
    products,
    categories,
    cartItems,
    setCartItems,
    handleAddToCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
