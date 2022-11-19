import React from "react";
import homeStyle from "./Home.module.css";
import CardProduct from "../../components/HomeComponent/CardProduct";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/products`)
      .then((res) => {
        setAllProduct(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={homeStyle.main}>
      <div className="container h-100">
        <div className={`mt-4 ${homeStyle.productList}`}>
          <div className="row">
            <CardProduct data={allProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
