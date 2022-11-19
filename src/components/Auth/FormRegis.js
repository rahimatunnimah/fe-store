import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import registerStyle from "../../pages/Register/Register.module.css";

function FormRegis() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/api/auth/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res?.data);
        Swal.fire({
          icon: "success",
          title: "Succseed",
          text: res?.data?.message,
        }).then((res) => (res.isConfirmed ? navigate("/login") : null));
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
  console.log("user", setUsername);
  return (
    <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className={`${registerStyle.formRegis}`}
          type="text"
          placeholder="Your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className={`${registerStyle.formRegis}`}
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className={`${registerStyle.formRegis}`}
          type="password"
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button
          className={`${registerStyle.btnRegis}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register Account"}
        </Button>
      </div>
    </Form>
  );
}

export default FormRegis;
