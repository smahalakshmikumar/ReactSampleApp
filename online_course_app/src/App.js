import './App.css';
import CourseList from "./components/CourseList/CourseList";
import SelectedCourse from "./components/SelectedCourse/SelectedCourse";
import MyCourses from "./components/MyCourses/MyCourses";

import NavigationBar from "./UI/NavigationBar";
import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginForm from './UI/loginForm';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <Switch>
          <Route component={LoginForm} path="/" exact={true}  /> 
            <Route component={CourseList} path="/CourseList" />
             <Route
              component={MyCourses}
              path="/MyCourses"
            />
            <Route component={SelectedCourse} path="/SelectedCourse" /> 
          </Switch>
        </Router>
      </React.Fragment>
      
    </div>
  );
}

export default App;
