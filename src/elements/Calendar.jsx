import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';

import { db, collection, query, where, getDocs } from "../firebase";

import "./Calendar.css";

const BOOK_REQ_NAME = "book-req";
const POSSIB_TIMES_NAME = "book_possib_times";
const DATE_FORMAT = "YYYY-MM-DD";
const test_data_not_ready = [1, 2, 3, 4, 5];
// const background_color = "#31363F"
const background_color = "black";
const possible_times = [
  {0: "07:00"},
  {1: "08:00"},
  {2: "09:00"},
  {3: "10:00"},
  {4: "11:00"},
  {5: "12:00"},
  {6: "13:00"},
  {7: "14:00"},
  {8: "15:00"},
  {9: "16:00"},
  {10: "17:00"},
  {11: "18:00"},
  {12: "19:00"},
  {13: "20:00"},
  {14: "21:00"},
];

function Calendar({ backAction_, confirmAction_ }) {
  const calendar_ref = useRef(null);
  const backAction = backAction_;
  const confirmAction = confirmAction_;
  const [cResp, setCresp] = useState(null);
  const [datePick, setDatePick] = useState(dayjs(Date.now()));
  const [timePick, setTimePick] = useState("");
  const [timePickShow, setTimePickShow] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [possibTime, setPossibTime] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [listHeight, setListHeight] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setListHeight(calendar_ref.current.clientHeight);
  }, [calendar_ref]); //empty dependency array so it only runs once at render

  useEffect(() => {
    fetchPossibTimes();
    fetchData(dayjs(Date.now()).format(DATE_FORMAT).toString());
  }, []);

  const fetchPossibTimes = async () => {
    const collectionRef = await collection(db, POSSIB_TIMES_NAME);
    const querySnapshot = await getDocs(collectionRef);
    const fetchedItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Possib times ", fetchedItems);
    setPossibTime(fetchedItems.sort((a, b) => a.time_token - b.time_token));
    setTimePickShow(true);
  };

  const fetchData = async (newValue) => {
    const collectionRef = await collection(db, BOOK_REQ_NAME);

    // Create a query with a criteria (e.g., field "status" equals "active")
    console.log(
      "Query string ",
      dayjs(newValue).format(DATE_FORMAT).toString()
    );
    const q = await query(
      collectionRef,
      where("date", "==", dayjs(newValue).format(DATE_FORMAT).toString())
    );
    // console.log("query result is : ", q);
    const querySnapshot = await getDocs(q);
    console.log("docs result : ", querySnapshot);
    const fetchedItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("fetched items: ", fetchedItems);
    setBookedSlots(fetchedItems);
    setTimePickShow(true);
  };

  const handleDateChange = async (newValue) => {
    await setDatePick(newValue); // Update state when the date changes
    console.log("Selected Date:", newValue.format(DATE_FORMAT)); // Format and use the value
    setTimePickShow(false);
    fetchData(newValue);
  };

  return (
    <div style={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container fluid>
          <Row
            style={{
              backgroundColor: "black",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Col lg={6} md={12}>
              <div>
                Select date:
              </div>
              <div style={{ backgroundColor: "white" }}>
                <StaticDatePicker
                  ref={calendar_ref}
                  value={datePick}
                  onChange={handleDateChange}
                  defaultValue={dayjs(Date.now())}
                  autoFocus
                  disablePast
                  actionBar={null}
                  orientation="portrait"
                  sx={{
                    ".MuiPickersToolbar-root": {
                      color: "white",
                      borderRadius: "2px",
                      borderWidth: "1px",
                      borderColor: background_color,
                      border: "1px solid",
                      backgroundColor: background_color,
                    },
                    ".MuiDayCalendar-root": {
                      color: "white",
                      borderRadius: "2px",
                      borderWidth: "1px",
                      borderColor: background_color,
                      border: "1px solid",
                      backgroundColor: "white",
                    },
                    ".MuiPickersCalendarHeader-root": {
                      color: "black",
                      borderRadius: "2px",
                      borderWidth: "1px",
                      borderColor: "#2196f3",
                      border: "1px solid",
                      backgroundColor: "white",
                    },
                  }}
                  slotProps={{
                    toolbar: { hidden: true },
                    actionBar: { actions: [] }, // Disables the action bar entirely
                    layout: {},
                  }}
                />
              </div>
            </Col>
            <Col lg={6} md={12}>
              {(
                <div style={{width:'100%'}}>
                  <div>Available time slots</div>
                  <Box
                    sx={{
                      width: "100%",
                      minWidth: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <List
                      sx={{
                        minWidth:"100%",
                        width: "100%",
                        maxWidth: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        height:listHeight,
                        "& ul": { padding: 0 },
                      }}
                    >
                      { timePickShow ? possibTime.map((element, index) => {
                        let should_be_disabled = false;
                        if (
                          bookedSlots.find(
                            (item) => item.time_token === element.time_token
                          )
                        )
                          should_be_disabled = true;

                        return (
                          <Tooltip title={should_be_disabled? "This timeslot is busy":"You can book this timeslot"} placement="bottom-start" slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, -30],
                                  },
                                },
                              ],
                            },
                          }}>
                          <ListItem key={index}>
                            <ListItemButton
                              selected={element.time_token === selectedIndex}
                              disabled={should_be_disabled}
                              onClick={(event) =>
                                handleListItemClick(event, element.time_token)
                              }
                            >
                              <ListItemText
                                style={{ color: "black" }}
                                primary={element.time}
                              />
                            </ListItemButton>
                          </ListItem>
                          </Tooltip>
                        );
                      }) : 
                      possible_times.map((element, index) => {
                        return (
                          <ListItem key={index}>
                              <Skeleton animation="wave" style={{width:'100%'}}/>
                          </ListItem>
                        )
                      })
                    }
                    </List>
                  </Box>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <span>
              <Button variant="outlined" onClick={backAction}>
                Back
              </Button>{" "}
              &nbsp;&nbsp;
              <Button
                variant="outlined"
                onClick={() => {
                  confirmAction(false);
                }}
              >
                Confirm
              </Button>
            </span>
          </Row>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default Calendar;
