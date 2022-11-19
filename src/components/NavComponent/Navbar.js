import React from "react";
import navStyle from "./Navbar.module.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalAdd from "../Modal/ModalAdd";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context";

const NavHome = () => {
  const user = React.useContext(ProfileContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  console.log(user);
  return (
    <>
      <Navbar fixed="top" expand="lg" className={navStyle.navContainer}>
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" className={navStyle.navMenu}>
                  Home
                </Link>
              </Nav.Link>
              {token ? (
                <ModalAdd />
              ) : (
                <Nav.Link>
                  <Link to="/login" className={navStyle.navMenu}>
                    Add Product
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {token ? (
                <NavDropdown title={user?.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className={navStyle.navMenu}>
                  Login
                </Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavHome;
