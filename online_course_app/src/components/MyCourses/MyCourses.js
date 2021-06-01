import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import LoadingIndicator from "../../UI/LoadingIndicator";
import NavigationBar from "../../UI/NavigationBar";
import "./MyCourse.module.css";

const MyCourses = (props) => {
  const [key, setKey] = useState("MyCollections");
  const [courses, setAllCourses] = useState([]);
  const [wishlistDataSource, setWishDataSource] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [ResponseData, setResponseData] = React.useState();

  useEffect(() => RefreshFunc(), []);

  //Refresh on tab click
  const RefreshFunc = () => {
    {
      setLoading(true);
      fetch(
        "https://reactlearning-4bb45-default-rtdb.firebaseio.com/CoursesList.json"
      )
        .then((response) => response.json())
        .then((responseData) => {
          setLoading(false);
          
          setResponseData(responseData);
        });
      fetch(
        "https://reactlearning-4bb45-default-rtdb.firebaseio.com/Courses.json"
      )
        .then((response) => response.json())
        .then((responseData) => {
          setLoading(false);
          const loadedCourse = [];
          for (const key in responseData) {
            loadedCourse.push({
              id: key,
              title: responseData[key].title,
              Description: responseData[key].Description,
            });
          }
          setAllCourses(loadedCourse);
        });
      fetch(
        "https://reactlearning-4bb45-default-rtdb.firebaseio.com/WishListCourses.json"
      )
        .then((response) => response.json())
        .then((responseData) => {
          setLoading(false);
          const loadedCourse = [];

          for (const key in responseData) {
            loadedCourse.push({
              id: key,
              title: responseData[key].title,
              Description: responseData[key].Description,
            });
          }
          setWishDataSource(loadedCourse);
        });
    }
  };

  const MoveMyCourses = (CourseId) => {
    setLoading(true);
    //fetch the corresponding id
    fetch(
      `https://reactlearning-4bb45-default-rtdb.firebaseio.com/WishListCourses/${CourseId}.json`,
      {
        method: "Get",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setLoading(false);

        fetch(
          `https://reactlearning-4bb45-default-rtdb.firebaseio.com/WishListCourses/${CourseId}.json`,
          {
            method: "Delete",
          }
        ).then((response) => {
          fetch(
            "https://reactlearning-4bb45-default-rtdb.firebaseio.com/Courses.json",
            {
              method: "POST",
              body: JSON.stringify(responseData),
              headers: { "Content-Type": "application/json" },
            }
          )
           setLoading(false);
          setWishDataSource((prevCourses) =>
            prevCourses.filter((course) => course.id !== CourseId)
          );
        });
      });
  };

  //wishlist click func
  const WishListClicked = (CourseId) => {
    setLoading(true);
    //fetch the corresponding id
    fetch(
      `https://reactlearning-4bb45-default-rtdb.firebaseio.com/Courses/${CourseId}.json`,
      {
        method: "Get",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setLoading(false);
        fetch(
          `https://reactlearning-4bb45-default-rtdb.firebaseio.com/Courses/${CourseId}.json`,
          {
            method: "Delete",
          }
        ).then((response) => {
          fetch(
            "https://reactlearning-4bb45-default-rtdb.firebaseio.com/WishListCourses.json",
            {
              method: "POST",
              body: JSON.stringify(responseData),
              headers: { "Content-Type": "application/json" },
            }
          )
          setLoading(false);
          setAllCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== CourseId)
          );
        });
      });
  };

  //Delete from my collections
  const DeleteClicked = (CourseId) => {
    setLoading(true);
    // ResponseData["isEnrolled"]=false;
    // fetch(
    //   `https://reactlearning-4bb45-default-rtdb.firebaseio.com/CoursesList/${CourseId}.json`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(ResponseData),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // ).then((response)=>{
      fetch(
        `https://reactlearning-4bb45-default-rtdb.firebaseio.com/Courses/${CourseId}.json`,
        {
          method: "Delete",
        }
      ).then((response) => {
        setLoading(false);
        setAllCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== CourseId)
        );
      });
    //})
    
  };

  //delete from wishlist
  const DeleteWishClicked = (CourseId) => {
    setLoading(true);
    fetch(
      `https://reactlearning-4bb45-default-rtdb.firebaseio.com/WishListCourses/${CourseId}.json`,
      {
        method: "Delete",
      }
    ).then((response) => {
      setLoading(false);
      setWishDataSource((prevCourses) =>
        prevCourses.filter((course) => course.id !== CourseId)
      );
    });
  };

  return (
    <>
      <NavigationBar />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          RefreshFunc();
        }}
      >
        <Tab eventKey="MyCollections" title="My  Collections">
          <div class="container-fluid">
            {isLoading && <LoadingIndicator></LoadingIndicator>}

            <div class="card-deck" style={{ padding: "10px" }}>
              {courses.map((data) => (
                <div
                  class="card bg-light mb-3"
                  key="data.id"
                  style={{ maxWidth: "25rem" }}
                >
                  <div class="card-header">
                    <h5 class="card-title">{data.title}</h5>
                  </div>
                  <div class="card-body">
                    {/* <h5 class="card-title">Info card title</h5> */}
                    <p class="card-text">{data.Description}</p>
                  </div>
                  <div class="card-footer" style={{ padding: "10px" }}>
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={{ margin: "20px" }}
                      onClick={() => DeleteClicked(data.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-info"
                      onClick={() => WishListClicked(data.id)}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
               
            </div>
          </div>
        </Tab>
        <Tab eventKey="Wishlist" title="Wishlist">
          <div class="container-fluid">
            {isLoading && <LoadingIndicator></LoadingIndicator>}
            <div class="card-deck" style={{ padding: "10px" }}>
              {wishlistDataSource.map((data) => (
                <div
                  class="card bg-light mb-3"
                  key="data.id"
                  style={{ maxWidth: "25rem" }}
                >
                  <div class="card-header">
                    <h5 class="card-title">{data.title}</h5>
                  </div>
                  <div class="card-body">
                    <p class="card-text">{data.Description}</p>
                  </div>
                  <div class="card-footer" style={{ padding: "10px" }}>
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={{ margin: "20px" }}
                      onClick={() => DeleteWishClicked(data.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-info"
                      onClick={() => MoveMyCourses(data.id)}
                    >
                      Move to My courses
                    </button>
                  </div>
                </div>
              ))}
               
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};
export default MyCourses;
