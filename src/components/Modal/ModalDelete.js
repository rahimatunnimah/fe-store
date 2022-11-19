import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ModalDelete() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const idProduct = useParams();
  const { id } = idProduct;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .delete(`${process.env.REACT_APP_URL}/api/products/delete/${id}`, config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res?.data,
        }).then((res) => (res.isConfirmed ? navigate("/") : null));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            disabled={isLoading}
            onClick={handleDeleteProduct}
          >
            {isLoading ? "Loading..." : "Delete Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
