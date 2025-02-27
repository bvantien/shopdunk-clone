import React, { useContext, useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const SearchBar = ({ searchRef, setSearchActive }) => {
  const isProduction = import.meta.env.MODE === "production";

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const { url, products } = useContext(StoreContext);

  const debounceTimer = useRef(null);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
  }, [query]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <form className="searchbar__form">
      <input
        ref={searchRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Tìm kiếm"
        className="searchbar__input"
      />

      {query && (
        <ul>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product._id} onClick={() => setSearchActive(false)}>
                <Link to={`/${product.category}/${product._id}`}>
                  <img
                    src={
                      isProduction
                        ? product.cloudImage
                        : url + "/images/" + product.localImage
                    }
                    alt=""
                  />
                  <span>{`${product.name} ${product.capacity}`}</span>
                </Link>
              </li>
            ))
          ) : (
            <li>Không tìm thấy sản phẩm nào phù hợp.</li>
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
