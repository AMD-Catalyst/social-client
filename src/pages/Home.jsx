import React from "react";
import Announcement from "../components/shared/Announcement";
import Navbar from "../components/shared/Navbar";
import Slider from "../components/shared/Slider";
import Categories from "../components/shared/Categories";
import Products from "../components/shared/Products";
import Newsletter from "../components/shared/Newsletter";
import Footer from "../components/shared/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Products homeProduct={true} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
