import React, { useState, useEffect } from "react";
import NavHome from "../../components/NavComponent/Navbar";
import detailStyle from "./Detail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalEdit from "../../components/Modal/ModalEdit";
import ModalDelete from "../../components/Modal/ModalDelete";
import ModalEditImage from "../../components/Modal/ModalEditImage";
import Table from "react-bootstrap/Table";

const DetailProduct = () => {
  const [detailProduct, setDetailProduct] = useState({});
  const idProduct = useParams();
  const { id } = idProduct;

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

  return (
    <>
      <NavHome />
      <div className="container">
        <div className={detailStyle.body}>
          <div className="d-flex justify-content-between">
            <h1 className="mt-2">Detail Product</h1>
            <div>
              <ModalEdit />
              <ModalDelete />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className={`${detailStyle.img} mt-3`}>
                <img src={detailProduct?.image} alt="..." />
              </div>
              <ModalEditImage />
            </div>
          </div>
          <hr />
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name:</th>
                  <td>{detailProduct?.name}</td>
                  <th>Purchase Price:</th>
                  <td>
                    <span>Rp. </span>
                    {detailProduct?.buy_price}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Stock:</th>
                  <td>
                    {detailProduct?.stock}
                    <span> pcs</span>
                  </td>
                  <th>Seling Price:</th>
                  <td>
                    <span>Rp. </span>
                    {detailProduct?.sell_price}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
