import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ModalEditImage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productImage, setProductImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const idProduct = useParams();
  const { id } = idProduct;

  const handleUploadImage = (e) => {
    let photoProduct = e.target?.files[0];
    setProductImage(photoProduct);
  };

  const handleUpdateImageProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", productImage);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data; ",
      },
    };

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/products/edit/photo/${id}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          text: res?.data,
        }).then((res) => (res.isConfirmed ? handleClose() : null));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: err?.response?.data,
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
          <Form onSubmit={handleUpdateImageProduct}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Edit Product Image</Form.Label>
              <Form.Control type="file" onChange={handleUploadImage} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Edit Image"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditImage;
