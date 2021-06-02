import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactVideo } from "reactjs-media";

import NavigationBar from "../../UI/NavigationBar";
import { Button, Tabs, Tab, Accordion, Card } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import CourseList from "../CourseList/CourseList";
import Paper from "@material-ui/core/Paper";
import downarrowIcon from "../../resources/downarrowIcon.png";
import upArrow from "../../resources/upArrow.png";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import "./selectedCourse.module.css";
import LoadingIndicator from "../../UI/LoadingIndicator";

function CustomToggle({ children, eventKey }) {
  const [isClicked, setClicked] = useState(false);
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    if (!isClicked) setClicked(true);
    else setClicked(false);
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "row" }}
      onClick={decoratedOnClick}
    >
      {isClicked ? (
        <img
          src={downarrowIcon}
          alt="downarrowIcon"
          width="20px"
          height="20px"
          style={{
            flex: "5%",
            margin: "25x",
          }}
        />
      ) : (
        <img
          src={upArrow}
          alt="upArrow"
          width="20px"
          height="20px"
          style={{
            flex: "5%",
            margin: "25px",
          }}
        />
      )}

      <div style={{ margin: "10px", padding: "10px", flex: "100%" }}>
        {children}
      </div>
    </div>
  );
}
const SelectedCourse = (props) => {
  const [key, setKey] = useState("home");
  const [isLoading, setLoading] = React.useState(false);
  const [isPopup, setPopup] = React.useState(false);
  const [ResponseData, setResponseData] = React.useState();
  const [DataSource, setSelectedCourse] = React.useState([]);
  

  useEffect(() => {
    setLoading(true);
    
    //fetching the selected course data

    fetch(
      `https://reactlearning-4bb45-default-rtdb.firebaseio.com/CoursesList/${props.location.selectedID}.json`,

      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setLoading(false);
        const loadedCourse = [];
        loadedCourse.push({
          title: responseData.title,
          Description: responseData.Description,
          ImageSrc: responseData.ImageSrc,
          VideoSrc: responseData.VideoSrc,
          isEnrolled: responseData.isEnrolled,
        
        });

        setSelectedCourse(loadedCourse);
        setResponseData(responseData);
      });

   
  }, []);

  const EnrollNow = () => {
    setLoading(true);
    ResponseData["isEnrolled"]= true;
    fetch(
      `https://reactlearning-4bb45-default-rtdb.firebaseio.com/CoursesList/${props.location.selectedID}.json`,
      
      {
        method: "PUT",
        body: JSON.stringify(ResponseData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        //creating separate json for added courses
        fetch(
          "https://reactlearning-4bb45-default-rtdb.firebaseio.com/Courses.json",
          
          {
            method: "POST",
            body: JSON.stringify(ResponseData),
            headers: { "Content-Type": "application/json" },
          }
        )
        setLoading(false);
        setPopup(true);
      });
  };

  return (
    <>
      {" "}
      <NavigationBar />
      {isLoading && <LoadingIndicator></LoadingIndicator>}
      {isPopup && (
        <SweetAlert
          show={isPopup}
          success
          title="success!"
          onConfirm={() => setPopup(false)}
        >
          Enrolled successfully!
        </SweetAlert>
      )}
      <div class="container-fluid" style={{ padding: "10px" }}>
        <div class="row" style={{ padding: "5px" }}>
          {DataSource.map((data) => (
            <>
              <div class="col-md-6 col-sm-12">
                <ReactVideo
                  src={data.VideoSrc}
                  poster={data.ImageSrc}
                  primaryColor="red"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <h1>{data.title} </h1>
                <p>{data.Description}</p>
                {data.isEnrolled? (
                  <Button variant="warning" disabled>
                    Enrolled
                  </Button>
                  
                ) : !data.isEnrolled? (
                  <Button variant="info" onClick={EnrollNow}>
                  Enroll Now
                </Button>
                ) : (
                  <Button variant="warning" disabled>
                    Wishlisted
                  </Button>
                )}
              </div>
            </>
          ))}
        </div>

        
      </div>
    </>
  );
};
export default SelectedCourse;
