import React from "react";
import { Outlet } from "react-router";
import Navbar from "../NavComponent/Navbar";

const DisplayNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DisplayNavbar;
