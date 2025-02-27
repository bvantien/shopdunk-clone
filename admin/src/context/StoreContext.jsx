import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_API_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!sessionStorage.getItem("token")
  );

  const handleLogin = (token) => {
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const contextValue = { url, isLoggedIn, handleLogin, handleLogout };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
