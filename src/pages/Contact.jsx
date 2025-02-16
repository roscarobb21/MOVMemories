import { useState, useEffect } from "react";
import Navigator from "../elements/Navbar";
import { Container, Row, Col } from "reactstrap";

import Contact_form from "../elements/Contact_form";
import Socials from "../elements/Socials";
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
      <div style={{marginTop: "30px"}}>
        <Container fluid className="default-container-padding">
        <Row md="12" className="d-flex justify-content-center align-items-center">
          <Col md="3" sm="0" xs="0"></Col>
          <Col md="6" sm="12" xs="0">
          <div className="inverted-color-text space-grotesk-big-bold medium-text justify-text">{langFile.header}</div>
          </Col>
          <Col md="3" sm="0" xs="0"></Col>
        </Row>
        <br></br>
        <Row>
          <Col md="3" xs="0"></Col>
          <Col md="6" xs="12">
          <div className="inverted-color-text space-grotesk-slim justify-text">{langFile.body}</div>
          </Col>
          <Col md="3" xs="0"></Col>
        </Row>
        <br></br>
        <Row>
          <Col>
          <Contact_form />
          </Col>
        </Row>
        </Container>
        </div>
        <Socials />
      </div>
    </div>
  );
}

export default Contact;
