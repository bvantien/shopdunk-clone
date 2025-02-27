import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);

  const { cartItems } = useContext(StoreContext);

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (isSearchActive && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchActive]);

  return (
    <header>
      <div className="header">
        {isSearchActive ? (
          <div className="header__searchbar">
            <div
              className="overlay"
              onClick={() => setSearchActive(false)}
            ></div>
            <SearchBar
              searchRef={searchRef}
              setSearchActive={setSearchActive}
            />
          </div>
        ) : (
          <>
            <div className="header__hamburger-menu">
              <span onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                )}
              </span>

              <ul className={`${isOpen ? "show" : ""}`}>
                <li>
                  <Link>Tạo tài khoản</Link>
                </li>
                <li>
                  <Link>Đăng nhập</Link>
                </li>
                <li>
                  <Link>Phụ kiện</Link>
                </li>
                <li>
                  <Link>Máy cũ</Link>
                </li>
                <li>
                  <Link>Dịch vụ</Link>
                </li>
                <li>
                  <Link>Tin tức</Link>
                </li>
                <li>
                  <Link>Khuyến mãi</Link>
                </li>
              </ul>
            </div>

            <div className="header__logo">
              <Link to="/">
                <img
                  src="https://shopdunk.com/images/thumbs/0027333_logo-shopdunk.png"
                  alt=""
                />
              </Link>
            </div>

            <ul className="header__menu">
              <li>
                <NavLink to="/iphone">
                  <span>iPhone</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/ipad">
                  <span>iPad</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/mac">
                  <span>Mac</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/apple-watch">
                  <span>Watch</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/phukien">
                  <span>Phụ kiện</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/maycu">
                  <span>Máy cũ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dichvu">
                  <span>Dịch vụ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/tintuc">
                  <span>Tin tức</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/khuyenmai">
                  <span>Khuyến mãi</span>
                </NavLink>
              </li>
            </ul>

            <div className="header__actions">
              <div
                className="header__search"
                onClick={() => setSearchActive(!isSearchActive)}
              >
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
              <div className="header__cart">
                <Link to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  <span>{getTotalQuantity()}</span>
                </Link>
              </div>
              <div className="header__login">
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="header__menu--responsive">
        <ul>
          <li>
            <NavLink to="/iphone">
              <span>iPhone</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ipad">
              <span>iPad</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mac">
              <span>Mac</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/apple-watch">
              <span>Watch</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/phukien">
              <span>Phụ kiện</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/maycu">
              <span>Máy cũ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dichvu">
              <span>Dịch vụ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tintuc">
              <span>Tin tức</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/khuyenmai">
              <span>Khuyến mãi</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
