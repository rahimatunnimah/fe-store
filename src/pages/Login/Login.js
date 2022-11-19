import React, { useEffect } from "react";
import loginStyle from "./Login.module.css";
import FormLogin from "../../components/Auth/FormLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  });

  return (
    <div className={`${loginStyle.container}`}>
      <h1>Welcome</h1>
      <h5 className="mt-3">Please login with your account</h5>
      <FormLogin />
      <p className="mt-3">
        Don't have a Tokopedia account?{" "}
        <Link to={"/register"} className={`${loginStyle.linkRegis}`}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
