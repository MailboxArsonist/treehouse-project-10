import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import course component
import Course from './Course';


class Courses extends Component {
  state = {
    loading : false,
    courses : []
  }

  componentWillMount() {
    this.setState({loading : true});
    axios.get('http://localhost:5000/api/courses')
          .then(results => {
            const courses = results.data.courses;
            this.setState({
              courses,
              loading : false
            })
          })
          .then(courses => {
            console.log(this.state.courses[0].title)
          })
          .catch(err => console.log(err))
  }

  courseCreator = () => {
      let courses = this.state.courses;
      return courses.map((course, index) => {
          return (
              <Course 
                  key={index}
                  courseId={course._id}
                  title={course.title}
              />
          )
      })
  }
  render() {
    return (
      <div className="bounds">
        {this.courseCreator()}
        <div className="grid-33">
            <Link className="course--module course--add--module" to="/create">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
            </Link>
        </div>
      </div>
    );
  }
}

export default Courses;