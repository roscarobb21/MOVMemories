import { useState, useEffect } from "react";
import Navigator from "../elements/Navbar";
import { Container, Row, Col } from "reactstrap";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
  Button,
} from "reactstrap";
import { db, collection, addDoc } from "../firebase";

import Contact_form from "../elements/Contact_form";
import Socials from "../elements/Socials";
import Booking from "../elements/Booking";
import Loader from "../pages/Loader";

import "./Contact.css";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Contact({ langData, navData }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Initial check
  const [emailValid, setEmailValid] = useState(undefined);
  const [generalError, setGeneralError] = useState("");
  const [submit, setSubmit] = useState(undefined);
  const [navLang, setNavLang] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phoneNumber: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [langFile, setLangFile] = useState(null);

  useEffect(() => {
    if (langData) setLangFile(langData);
    if (navData) setNavLang(navData);
  }, [langData, navData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (langFile === null) {
    return <Loader />;
  }

  return (
    <div>
      <div style={{ minHeight: "100vh" }} className="background-dark-color">
        <Navigator lang={navLang} />
        <Container
          style={{ minHeight: "70vh" }}
          className="d-flex margin-from-header default-container-padding"
        >
          <Row
            style={{ heigh: "inherit", width: "100% !important" }}
            className="justify-content-center align-items-center"
          >
            <Col lg={6} md={12}>
              <Row>
                <div className="inverted-color-text space-grotesk-big-bold medium-text justify-text">
                  {langFile.header}
                </div>
              </Row>
              <br></br>
              <br></br>
              <Row>
                <div className="inverted-color-text space-grotesk-slim justify-text">
                  {/* Alternatively, you can email us @ info@movmemories.com or contact
              us on social media by pressing on your preferred one below */}
                  {langFile.body}
                </div>
              </Row>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <Col
              lg={12}
              md={12}
              style={{ height: isMobile ? "auto" : "100%" }}
              className="justify-content-center align-items-center"
            >
              <div className="justify-content-center align-items-center">
                <Contact_form />
              </div>
            </Col>
          </Row>
        </Container>
        <div>{/* <Booking lang={langFile.booking} /> */}</div>
        <Socials />
      </div>
    </div>
  );
}

export default Contact;
