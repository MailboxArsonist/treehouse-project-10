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
    authenticated : null,
    username : null,
    password : null,
    name : null
  }

  signIn = (username, password, name, authenticated) => {
    console.log(name)
    if(authenticated){
      this.setState({
        authenticated,
        username,
        name,
        password
      })
    } else {
      this.setState({
        authenticated : false,
        username : null,
        password : null,
        name : null
      })
    }
  }

  signOut = () => {
    this.setState({
      authenticated: null,
      username: null,
      password: null,
      name : null
    })
  }
  
  
  render() {
    console.log('rendered app');
    console.log(this.state.name)
    return (
      <div>
        <Router>
          <>
            <Nav name={this.state.name} signOut={this.signOut}/>
            <Switch>
              <Route exact path="/" component={Courses}/>
              <Route exact path="/create" component={CreateCourse}/>
              <Route exact path="/courses/:id" component={CourseDetail}/>
              <Route exact path="/courses/:id/update" component={UpdateCourse}/>
              <Route exact path="/signup" render={props => (
                <UserSignUp authenticateUser={this.signIn}/>
              )}/>
              <Route exact path="/signin" render={props => (
                <UserSignIn authenticateUser={this.signIn}/>
              )}/>
              <Route component={NotFound}/>
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
