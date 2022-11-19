import React, { useState } from "react";
import { Modal, Nav, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import homeStyle from "../../pages/Home/Home.module.css";

function ModalAdd() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [productImage, setProductImage] = useState({});
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadImage = (e) => {
    let photoProduct = e.target?.files[0];
    setProductImage(photoProduct);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", productImage);
    formData.append("buy_price", buyPrice);
    formData.append("sell_price", sellPrice);
    formData.append("stock", stock);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data; ",
      },
    };

    axios
      .post(`${process.env.REACT_APP_URL}/api/products/add`, formData, config)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          text: "Add data product successfully",
        }).then((res) => (res.isConfirmed ? handleClose() : null));
      })
      .catch((err) => {
        console.log(err);
        // Swal.fire({
        //   icon: "error",
        //   text: err?.response?.data,
        // });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Nav.Link onClick={handleShow} className={homeStyle.mdlAddTitle}>
        Add Product
      </Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" onChange={handleUploadImage} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                autoFocus
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                autoFocus
                onChange={(e) => setSellPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                autoFocus
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAdd;
