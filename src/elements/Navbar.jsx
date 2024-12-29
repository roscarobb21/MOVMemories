import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";

import logo from "../assets/logo.png";
import { Cross as Hamburger } from "hamburger-react";

import "./Navbar.css";
import "./SlidingComponent.css";

function Navigator(args) {
  console.log("args " + args.props);
  const [isOpen, setIsOpen] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const [isBurgerOpen, setBurgerOpen] = useState(false);

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

  return (
    <div>
      <Container
        fluid
        style={{
          backgroundColor: "rgba(0, 0, 0," + args.props + ")",
          width: "100%",
        }}
      >
        <Row>
          <Navbar {...args} expand="md">
            <Col xl={1} l={1} md={0} s={0} xs={0}>
              <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                  <NavItem>
                    <NavLink href="/">
                      <span
                        className={`"nav-button-color space-grotesk-1 " ${
                          currentRoute === "/home" || currentRoute === "/"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        Home
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/about">
                      <span
                        className={`"nav-button-color space-grotesk-1 " ${
                          currentRoute == "/about"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        About
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/packages">
                      <span
                        className={`"nav-button-color space-grotesk-1 " ${
                          currentRoute == "/packages"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        Packages
                      </span>
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink href="/">
                      <span className="nav-button-color nav-text-underline space-grotesk-1">
                        Portofolio
                      </span>
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink href="/contact">
                      <span
                        className={`"nav-button-color space-grotesk-1 " ${
                          currentRoute == "/contact"
                            ? "nav-text-underline-sure"
                            : "nav-text-underline"
                        }`}
                      >
                        Contact
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Col>
            <Col xl={1} l={1} md={6} s={6} xs={6}>
              <div className="justify-content-xs-start justify-content-md-center">
                <NavbarBrand className="">
                  <a href="/">
                    <img
                      alt="logo"
                      src={logo}
                      className="logo header-title-logo"
                    />
                  </a>
                </NavbarBrand>
              </div>
            </Col>
            <Col xl={1} l={1} md={6} s={6} xs={6}>
              {isSmallScreen && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    zIndex: "1061",
                  }}
                >
                  <Hamburger
                    toggled={isBurgerOpen}
                    toggle={setBurgerOpen}
                    color="white"
                    onClick={function noRefCheck() {}}
                  />
                </div>
              )}
              {isSmallScreen && (
                <div>
                  <Offcanvas
                    backdrop={false}
                    direction="bottom"
                    fade={false}
                    isOpen={isBurgerOpen} // Controlled by state
                    toggle={setBurgerOpen} // Toggled by the button or close button inside
                    className="fullscreen-offcanvas"
                    style={{ zIndex: 99 }}
                  >
                    <OffcanvasBody className="sliding-background-color">
                      <Container>
                        <Row>
                          <a
                            href="/"
                            className="nav-text-font nav-text-large nav-option space-grotesk-1"
                          >
                            <span
                              className={`"nav-button-color space-grotesk-1 " ${
                                currentRoute === "/home" || currentRoute === "/"
                                  ? "nav-text-underline-sure"
                                  : "nav-text-underline"
                              }`}
                            >
                              Home
                            </span>
                          </a>
                        </Row>
                        <Row>
                          <a
                            href="/about"
                            className="nav-text-font nav-text-large nav-option space-grotesk-1"
                          >
                            <span
                              className={`"nav-button-color space-grotesk-1 " ${
                                currentRoute == "/about"
                                  ? "nav-text-underline-sure"
                                  : "nav-text-underline"
                              }`}
                            >
                              About
                            </span>
                          </a>
                        </Row>
                        <Row>
                          <a
                            href="/packages"
                            className="nav-text-font nav-text-large nav-option space-grotesk-1"
                          >
                            <span
                              className={`"nav-button-color space-grotesk-1 " ${
                                currentRoute == "/packages"
                                  ? "nav-text-underline-sure"
                                  : "nav-text-underline"
                              }`}
                            >
                              Packages
                            </span>
                          </a>
                        </Row>
                        <Row>
                          <a
                            href="/contact"
                            className="nav-text-font nav-text-large nav-option space-grotesk-1"
                          >
                            <span
                              className={`"nav-button-color space-grotesk-1 " ${
                                currentRoute == "/contact"
                                  ? "nav-text-underline-sure"
                                  : "nav-text-underline"
                              }`}
                            >
                              Contact
                            </span>
                          </a>
                        </Row>
                      </Container>
                    </OffcanvasBody>
                  </Offcanvas>
                </div>
              )}
            </Col>
          </Navbar>
        </Row>
      </Container>
    </div>
  );
}

export default Navigator;