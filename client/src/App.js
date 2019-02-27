import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';


//import components 
import Nav from './components/Nav';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import CourseDetail from './components/CourseDetail/CourseDetail';


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
              <Route path="/courses/:id" component={CourseDetail}/>
              <Route component={NotFound}/>
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
