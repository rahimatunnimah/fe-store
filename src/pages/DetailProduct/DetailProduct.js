import React, { useState, useEffect } from "react";
import NavHome from "../../components/NavComponent/Navbar";
import detailStyle from "./Detail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalEdit from "../../components/Modal/ModalEdit";
import ModalDelete from "../../components/Modal/ModalDelete";
import ModalEditImage from "../../components/Modal/ModalEditImage";

const DetailProduct = () => {
  const [detailProduct, setDetailProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/products/detail/${id}`)
      .then((res) => {
        setDetailProduct(res?.data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const idProduct = useParams();
  const { id } = idProduct;

  return (
    <>
      <NavHome />
      <div className="container">
        <div className={detailStyle.body}>
          <div className="d-flex justify-content-between">
            <h1>Detail Product</h1>
            <div>
              <ModalEdit />
              <ModalDelete />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className={detailStyle.img}>
                <img src={detailProduct?.image} alt="..." />
              </div>
              <ModalEditImage />
            </div>
          </div>
          <hr />
          <div className="row text-center">
            <div className="col-6">
              <p>
                Product Name: <span>{detailProduct?.name}</span>
              </p>
              <p>
                Stock: <span>{detailProduct?.stock}</span>
              </p>
            </div>
            <div className="col-6">
              <p>
                Purchase Price: <span>{detailProduct?.buy_price}</span>
              </p>
              <p>
                Seling Price: <span>{detailProduct?.sell_price}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
