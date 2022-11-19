import React, { useState } from "react";
import registerStyle from "./Register.module.css";
import FormRegis from "../../components/Auth/FormRegis";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`${registerStyle.container}`}>
      <h5 className="mt-3">Please signup with your account</h5>
      <FormRegis />
      <p className="mt-3">
        Already have a Tokopedia account?{" "}
        <Link to={"/login"} className={`${registerStyle.linkLogin}`}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
