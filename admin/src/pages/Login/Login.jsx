import React, { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Login = () => {
  const { url, handleLogin } = useContext(StoreContext);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      console.log("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/admin/login`, data);

      if (response.data.success) {
        handleLogin(response.data.token);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={onLogin}>
        <div className="login-page__username">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={data.username}
            type="text"
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-page__password">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={data.password}
            type="password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-page__login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
