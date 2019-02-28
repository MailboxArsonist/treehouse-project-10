import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';


//import components 
import Nav from './components/Nav';
import Courses from './components/Courses';
import NotFound from './components/Errors/NotFound';
import CourseDetail from './components/CourseDetail/CourseDetail';
import UserSignUp from './components/User/UserSignUp';
import UserSignIn from './components/User/UserSignIn';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/CourseDetail/UpdateCourse';



class App extends Component {
  state = {
    loading : false,
    courses : []
  }
  render() {
    return (
      <div>
        <Router>
          <>
            <Nav />
            <Switch>
              <Route exact path="/" component={Courses}/>
              <Route exact path="/create" component={CreateCourse}/>
              <Route exact path="/courses/:id" component={CourseDetail}/>
              <Route exact path="/courses/:id/update" component={UpdateCourse}/>
              <Route exact path="/signup" component={UserSignUp}/>
              <Route exact path="/signin" component={UserSignIn}/>
              <Route component={NotFound}/>
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
