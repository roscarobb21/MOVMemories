import { useState } from "react";

import { db, collection, addDoc } from "../firebase";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { motion, AnimatePresence } from 'framer-motion';

import Alert from '@mui/material/Alert';

import Calendar from "./Calendar";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const TRANSITION_DURATION = 0.3;
const TRANSITION_X_FACTOR = 500;

function Conctact_form() {
  // is visible for contact form
  const [contactFormVisible, setContactFormVisible] = useState(true)
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [uid, setUid] = useState(null)

  // form data
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState(null)
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [generalErr, setGeneralErr] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedValue, setSelectedValue] = useState('y');

  const add_contact_message  = async () =>{
    let response = await addDoc(collection(db, "contact-messages"), {
      firstName: first_name,
      lastName: last_name,
      email: email,
      message: message,
      phoneNumber: phone,
      has_booking: selectedValue == 'y',
      createdAt: new Date(), // Optionally add timestamp
    });
    console.log("response from contact ", response.id);
    setUid(response.id);
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const toggle = () => {
    setContactFormVisible(false);
  }

  const toggle_back = () => {
    setCalendarVisible(false);
    setContactFormVisible(true);
  };

  const confirm_action = (check) =>{
    alert('send form + ', check)
  }

  const inputprops = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputprops: { 'aria-label': item },
  });

  const handleSubmit = () =>{
    // validations
    // if (!emailRegex.test(email)) {
    //   setEmailErr("Please provide a valid email 🥰");
    //   return;
    // }
    // if (
    //   first_name.length < 1 ||
    //   last_name.length < 1 ||
    //   phone.length < 1 ||
    //   message.length < 1
    // ) {
    //   console.log("General ERROR");
    //   setGeneralErr("Please fill out the form 🥰");
    //   return;
    // }
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
      add_contact_message();
    }
    // unmount form and mount calendar to select time frame
    else {
      toggle();
    }
  }

  return (
    <div >
      <AnimatePresence>
        {contactFormVisible && (
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }} // Slide out to the left
            transition={{ duration: TRANSITION_DURATION }} // Animation duration
            // Only trigger when exit animation completes
            onAnimationComplete={() => {
              setCalendarVisible(true); // Show the calendar
            }}
          >
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "66%" },
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
              </Box>
              <Box
                component="form"
                sx={{ gap: 1, "& > :not(style)": { m: 1, width:"66%" } }}
                noValidate
                autoComplete="off"
              >
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
                  label="Phone number"
                  variant="filled"
                  onChange={(e) => {
                    setGeneralErr(null);
                    setPhone(e.target.value);
                  }}
                />
                </Box>
                <Box
                component="form"
                sx={{ gap: 1, "& > :not(style)": { m: 1, width: "66%" } }}
                noValidate
                autoComplete="off"
              >
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
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      {...inputprops("y")}
                      style={{ color: "white" }}
                      value="y"
                      color="secondary"
                      control={<Radio />}
                      label="I want to request a booking for a meeting"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: "white", // Default color (outline of the radio button)
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "white", // Color when the radio button is selected
                        },
                      }}
                    />
                    <FormControlLabel
                      {...inputprops("n")}
                      style={{ color: "white" }}
                      value="n"
                      control={<Radio />}
                      label="I do not want a meeting"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: "white", // Default color (outline of the radio button)
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "white", // Color when the radio button is selected
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
                <Button variant="outlined" onClick={handleSubmit} style={{width:'33%'}}>
                  Submit
                </Button>
              </Box>
              {generalErr && <Alert severity={"error"}>{generalErr}</Alert>}
              {submitSuccess && (
                <Alert severity={"success"}>Form successfully submitted</Alert>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Calendar element display */}
      <AnimatePresence>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "100%",
          }}
        >
          {calendarVisible && (
            <motion.div
              key="second"
              initial={{ x: 500, opacity: 0 }} // Slide in from the right
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: TRANSITION_DURATION }}
              style={{
                background: "transparent",
                padding: "20px",
                width: "auto",
                minHeight: "100%",
              }}
            >
              <div className="space-grotesk-big-bold inverted-color-text">
                <Calendar backAction_={toggle_back} confirmAction_={confirm_action}/>
              </div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default Conctact_form;
