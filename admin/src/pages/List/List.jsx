import React, { useContext, useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Pagination from "../../components/Pagination/Pagination";

const isProduction = import.meta.env.MODE === "production";

const List = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredList = searchQuery
    ? list.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.series.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : list;

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const displayedProducts = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/products`);
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/products/${id}`);
      fetchList();
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-page">
      <div className="list-page__search">
        <div className="list-page__search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="list-page__table">
        <div className="list-page__table-format list-page__title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Series</b>
          <b>Capacity</b>
          <b>Colors</b>
          <b>Discount</b>
          <b>Old price</b>
          <b>Current price</b>
        </div>

        {displayedProducts.length === 0 ? (
          <>
            <p style={{ textAlign: "center", padding: "10px" }}>
              No matching products found.
            </p>
          </>
        ) : (
          displayedProducts.map((item) => (
            <div key={item._id} className="list-page__table-format">
              <img
                src={
                  isProduction
                    ? item.cloudImage
                    : url + "/images/" + item.localImage
                }
                alt=""
              />
              <p>{item.name}</p>
              <p>
                {item.category === "iphone"
                  ? "iPhone"
                  : item.category === "ipad"
                  ? "iPad"
                  : item.category === "mac"
                  ? "Mac"
                  : "Watch"}
              </p>
              <p>{item.series}</p>
              <p>{item.capacity}</p>
              <div>
                {item.colors.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 0",
                    }}
                  >
                    <p>{item.color}</p>
                    <p>{item.code}</p>
                    <img
                      src={
                        isProduction
                          ? item.cloudColorImage
                          : url + "/images/" + item.localColorImage
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <p>{item.discount}</p>
              <p>{item.old_price}</p>
              <p>{item.current_price}</p>
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  className="list-page__edit-btn"
                  onClick={() => navigate(`/edit/${item._id}`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
                <button
                  className="list-page__remove-btn"
                  onClick={() => removeProduct(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default List;
