import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Edit from "./pages/Edit/Edit";
import Login from "./pages/Login/Login";
import Orders from "./pages/Orders/Orders";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const { isLoggedIn } = useContext(StoreContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
      />

      <Route
        path="/*"
        element={
          isLoggedIn ? (
            <>
              <Header />
              <div className="content">
                <Sidebar />
                <Routes>
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
