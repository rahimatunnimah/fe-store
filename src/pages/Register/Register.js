import React from "react";
import registerStyle from "./Register.module.css";
import FormRegis from "../../components/Auth/FormRegis";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`${registerStyle.container}`}>
      <h1 className={`${registerStyle.title}`}>Welcome</h1>
      <h5 className={`${registerStyle.title}`}>
        Please signup with your account
      </h5>
      <FormRegis />
      <p className="mt-3">
        Already have an account?{" "}
        <Link to={"/login"} className={`${registerStyle.linkLogin}`}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
