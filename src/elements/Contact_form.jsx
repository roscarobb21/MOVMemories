import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { motion, AnimatePresence } from "framer-motion";

import Alert from "@mui/material/Alert";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const TRANSITION_DURATION = 0.3;
const TRANSITION_X_FACTOR = 500;

const MOBILE_FORM_WIDTH = "95%";
const NORMAL_FORM_WIDTH = "50%";

function Conctact_form() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Initial check
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

  // form data
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generalErr, setGeneralErr] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedValue, setSelectedValue] = useState("y");

  const add_contact_message = async () => {
    console.log("Not supported right now!");
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    // validations
    if (!emailRegex.test(email)) {
      setEmailErr("Please provide a valid email 🥰");
      return;
    }
    if (
      first_name.length < 1 ||
      last_name.length < 1 ||
      phone.length < 1 ||
      message.length < 1
    ) {
      console.log("General ERROR");
      setGeneralErr("Please fill out the form 🥰");
      return;
    }
    // also sumbit in database without booking
    // TODO submit
    if (selectedValue === "n") {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
    add_contact_message();
  };

  return (
    <div>
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: isMobile ? MOBILE_FORM_WIDTH : NORMAL_FORM_WIDTH,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            autoFocus
            value={first_name}
            style={{ backgroundColor: "white" }}
            id="outlined-basic"
            label="First Name"
            variant="filled"
            onChange={(e) => {
              setGeneralErr(null);
              setFirstName(e.target.value);
            }}
          />
          <TextField
            value={last_name}
            style={{ backgroundColor: "white" }}
            id="outlined-basic"
            label="Last Name"
            variant="filled"
            onChange={(e) => {
              setGeneralErr(null);
              setLastName(e.target.value);
            }}
          />

          <TextField
            value={email}
            fullWidth
            style={{ backgroundColor: "white" }}
            id="outlined-email"
            label="Email"
            variant="filled"
            error={emailErr != null}
            helperText={emailErr}
            onChange={(e) => {
              setEmailErr(null);
              setGeneralErr(null);
              setEmail(e.target.value);
            }}
          />
          <TextField
            value={phone}
            fullWidth
            style={{ backgroundColor: "white" }}
            id="outlined-email"
            type="number"
            label="Phone number"
            variant="filled"
            onChange={(e) => {
              setGeneralErr(null);
              setPhone(e.target.value);
            }}
          />

          <TextField
            value={message}
            style={{ backgroundColor: "white" }}
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="filled"
            onChange={(e) => {
              setGeneralErr(null);
              setMessage(e.target.value);
            }}
          />
          <br></br>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            style={{ width: "90px" }}
          >
            Submit
          </Button>
        </Box>
        {generalErr && <Alert severity={"error"}>{generalErr}</Alert>}
        {submitSuccess && (
          <Alert severity={"success"}>Form successfully submitted</Alert>
        )}
      </div>
    </div>
  );
}

export default Conctact_form;
