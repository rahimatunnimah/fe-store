import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import loginStyle from "../../pages/Login/Login.module.css";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/api/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        Swal.fire({
          icon: "success",
          text: "login successfully",
        }).then((res) => (res.isConfirmed ? navigate("/") : null));
      })
      .catch((err) => {
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
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className={`${loginStyle.formLogin}`}
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className={`${loginStyle.formLogin}`}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button
          className={`${loginStyle.btnLogin}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </div>
    </Form>
  );
}

export default FormLogin;
