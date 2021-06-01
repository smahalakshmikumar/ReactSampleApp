import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DesignImg from "../../resources/DesignImg.jpeg";
import coding from "../../resources/coding.jpeg";
import marketing from "../../resources/marketing.jpeg";
import softwareIT from "../../resources/softwareIT.jpeg";
import "./courseList.module.css";
import NavigationBar from "../../UI/NavigationBar";
import LoadingIndicator from "../../UI/LoadingIndicator";

const CourseList = (props) => {
  
  const [CourseData, setListCourses] = useState([]);
  const [isLoading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://reactlearning-4bb45-default-rtdb.firebaseio.com/CoursesList.json",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setLoading(false);
        const loadedCourse = [];
        for (const key in responseData) {
          loadedCourse.push({
            id: key,
            HeaderTitle: responseData[key].HeaderTitle,
            ImageSrc: responseData[key].ImageSrc,
          });
        }

        setListCourses(loadedCourse);

      });
  }, []);

  const handleClickedCourse = (selectedID) => {
    props.history.push({
      pathname: "/SelectedCourse",
      selectedID,
    });
  };
  
  return (
    <div class="container-fluid">
      <NavigationBar />
      {isLoading && <LoadingIndicator></LoadingIndicator>}

      <div class="card-columns" style={{ padding: "10px" }}>
        {CourseData.map((data) => (
          <>
          <div class="card" onClick={()=>handleClickedCourse(data.id)}>
            <img class="card-img-top" src={data.ImageSrc} alt="designImage" />
            <div class="card-footer">
              <small class="text-muted">{data.HeaderTitle}</small>
            </div>
          </div>
        </>
        ))}    
      </div>
    </div>
  );
};
export default CourseList;
