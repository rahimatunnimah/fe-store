import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ModalEdit() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const idProduct = useParams();
  const { id } = idProduct;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/products/detail/${id}`)
      .then((res) => {
        setProduct(res?.data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/products/edit/${id}`,
        {
          name: name,
          buy_price: buyPrice,
          sell_price: sellPrice,
          stock: stock,
        },
        config
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res?.data,
        }).then((res) => (res.isConfirmed ? handleClose() : null));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: `${err?.response?.data}`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProduct}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={product?.name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={product?.buy_price}
                autoFocus
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={product?.sell_price}
                autoFocus
                onChange={(e) => setSellPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder={product?.stock}
                autoFocus
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Edit Product"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;
