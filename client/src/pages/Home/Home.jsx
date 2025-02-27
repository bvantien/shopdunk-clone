import React from "react";
import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";
import CategoryList from "../../components/CategoryList/CategoryList";

const Home = () => {
  return (
    <div className="home-page">
      <Carousel />

      <div className="home-page__content">
        <CategoryList />

        <div className="home-page__banner">
          <img
            src="https://shopdunk.com/images/uploaded/Trang%20ch%E1%BB%A7/2.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
