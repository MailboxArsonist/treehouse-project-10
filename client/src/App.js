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
import PrivateRoute from './components/PrivateRoute';
import UserProvider from './context/UserProvider';
import ErrorBoundary from './components/Errors/ErrorBoundary';
import ServerError from './components/Errors/ServerError';
import UserSignOut from './components/User/UserSignOut';
import Forbidden from './components/Errors/Forbidden';



class App extends Component {
  
  
  render() {
    console.log('rendered app');
    return (
      <ErrorBoundary>
        <UserProvider>
          <Router>
            <>
                <Nav/>
                <Switch>
                  <Route exact path="/" component={Courses}/>

                  <PrivateRoute exact path="/courses/create" component={CreateCourse}/>
                  <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse}/>

                  <Route exact path="/courses/:id" component={CourseDetail}/>

                  <Route exact path="/signup" component={UserSignUp}/>
                  <Route exact path="/signin" component={UserSignIn}/>
                  <Route exact path="/signout" component={UserSignOut}/>
                  
                  <Route exact path="/forbidden" component={Forbidden}/>
                  <Route exact path="/error" component={ServerError}/>
                  <Route exact path="/notfound" component={NotFound}/>
                  <Route component={NotFound}/>
                </Switch>
            </>
          </Router>
        </UserProvider>
      </ErrorBoundary>
      
    );
  }
}

export default App;
