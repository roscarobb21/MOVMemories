import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Offcanvas, OffcanvasBody } from "reactstrap";

import logo from "../assets/logo.png";
import { Cross as Hamburger } from "hamburger-react";
import Loader from "../pages/Loader";
import "./Navbar.css";
import "./SlidingComponent.css";

function Navigator({ lang }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [navLang, setNavlang] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setNavlang(lang);
  }, [lang]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentRoute = location.pathname;

  if (!navLang) {
    return <Loader />;
  }

  return (
    <div>
      <Container fluid className="background-dark-color">
        <Row
          className={
            "d-flex " +
            (isSmallScreen ? "" : "justify-content-between align-items-center")
          }
        >
          <Col
            xl={12}
            l={12}
            md={12}
            s={6}
            xs={6}
            className={
              "d-flex " +
              (isSmallScreen ? "" : "justify-content-center align-items-center")
            }
          >
            <div
              className={
                "text-center logo-top-margin " +
                (isSmallScreen ? "margin-left-logo-menu" : "")
              }
            >
              <NavbarBrand className="" href="/">
                <img alt="logo" src={logo} className="logo header-title-logo" />
              </NavbarBrand>
            </div>
          </Col>
          <Col
            xl={0}
            l={0}
            md={0}
            s={6}
            xs={6}
            className={
              "d-flex " +
              (isSmallScreen
                ? "hamburger-small-screen"
                : "justify-content-center align-items-center")
            }
          >
            {isSmallScreen && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  zIndex: "1061",
                  marginTop: "20px",
                }}
              >
                <Hamburger
                  toggled={isBurgerOpen}
                  toggle={setBurgerOpen}
                  color="white"
                  onClick={function noRefCheck() {}}
                  distance="lg"
                />
              </div>
            )}
          </Col>
        </Row>

        <Row className="d-flex justify-content-center align-items-center">
          <Col
            xl={12}
            l={12}
            md={12}
            s={0}
            xs={0}
            className="d-flex justify-content-center align-items-center"
          >
            <Navbar expand="md">
              <Collapse navbar>
                <Nav className="me-auto" navbar>
                  <NavItem className="mx-2">
                    <NavLink href="/">
                      <span
                        className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                          currentRoute === "/home" || currentRoute === "/"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        {navLang.home}
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mx-2">
                    <NavLink href="/about">
                      <span
                        className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                          currentRoute == "/about"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        {navLang.about}
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mx-2">
                    <NavLink href="/packages">
                      <span
                        className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                          currentRoute == "/packages"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        {navLang.packages}
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mx-2">
                    <NavLink href="/contact">
                      <span
                        className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                          currentRoute == "/contact"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        {navLang.contact}
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mx-2">
                    <div
                      className="d-flex nav-button-color space-grotesk-1 inverted-color-text"
                      style={{ cursor: "pointer", height: "100%" }}
                      onClick={handleClick}
                    >
                      <span className="align-self-center justify-content-center align-items-center">
                        {navLang.language}
                      </span>
                    </div>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          localStorage.setItem("language", "EN");
                          window.location.reload();
                          setAnchorEl(null);
                        }}
                      >
                        EN 🇬🇧
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.setItem("language", "RO");
                          window.location.reload();
                          setAnchorEl(null);
                        }}
                      >
                        RO 🇷🇴
                      </MenuItem>
                    </Menu>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>

          <Col xl={1} l={1} md={1} s={6} xs={6}>
            {isSmallScreen && (
              <div>
                <Offcanvas
                  backdrop={false}
                  direction="bottom"
                  fade={false}
                  isOpen={isBurgerOpen} // Controlled by state
                  toggle={setBurgerOpen} // Toggled by the button or close button inside
                  className="fullscreen-offcanvas"
                  style={{ zIndex: 99, overflowY: "hidden" }}
                  scrollable={false}
                  unmountOnClose={false}
                >
                  <OffcanvasBody className="sliding-background-color">
                    <Container>
                      <Row>
                        <a
                          href="/"
                          className="nav-text-font nav-text-large nav-option space-grotesk-1"
                        >
                          <span
                            className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                              currentRoute === "/home" || currentRoute === "/"
                                ? "nav-text-underline-sure"
                                : "nav-text-underline"
                            }`}
                          >
                            {navLang.home}
                          </span>
                        </a>
                      </Row>
                      <Row>
                        <a
                          href="/about"
                          className="nav-text-font nav-text-large nav-option space-grotesk-1"
                        >
                          <span
                            className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                              currentRoute == "/about"
                                ? "nav-text-underline-sure"
                                : "nav-text-underline"
                            }`}
                          >
                            {navLang.about}
                          </span>
                        </a>
                      </Row>
                      <Row>
                        <a
                          href="/packages"
                          className="nav-text-font nav-text-large nav-option space-grotesk-1"
                        >
                          <span
                            className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                              currentRoute == "/packages"
                                ? "nav-text-underline-sure"
                                : "nav-text-underline"
                            }`}
                          >
                            {navLang.packages}
                          </span>
                        </a>
                      </Row>
                      <Row>
                        <a
                          href="/contact"
                          className="nav-text-font nav-text-large nav-option space-grotesk-1"
                        >
                          <span
                            className={`"nav-button-color space-grotesk-1 inverted-color-text " ${
                              currentRoute == "/contact"
                                ? "nav-text-underline-sure"
                                : "nav-text-underline"
                            }`}
                          >
                            {navLang.contact}
                          </span>
                        </a>
                      </Row>
                      <br></br>
                      <Row>
                        <div
                          style={{
                            cursor: "pointer",
                            height: "100%",
                            widht: "100%",
                          }}
                          onClick={handleClick}
                        >
                          <span className="nav-button-color space-grotesk-1 inverted-color-text nav-option">
                            {navLang.language}
                          </span>
                        </div>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              localStorage.setItem("language", "EN");
                              window.location.reload();
                              setAnchorEl(null);
                            }}
                          >
                            EN 🇬🇧
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              localStorage.setItem("language", "EN");
                              window.location.reload();
                              setAnchorEl(null);
                            }}
                          >
                            RO 🇷🇴
                          </MenuItem>
                        </Menu>
                      </Row>
                    </Container>
                  </OffcanvasBody>
                </Offcanvas>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Navigator;
