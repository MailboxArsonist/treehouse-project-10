import React, {Component} from 'react';
import axios from 'axios';

//import components
import ActionBar from './ActionBar';
import CourseContent from './CourseContent';
import CourseMaterial from './CourseMaterial';

//import context
import {UserContext} from '../../context/UserProvider';

class CourseDetail extends Component {
    state = {
        loading : true,
        course : []
      }

      //When component mounts update context location and fetch the courses
      componentDidMount() {
        const query = this.props.match.params.id;
        this.context.updateLocation(`/courses/${query}`);
        //fetch the courses and update state
        axios.get(`http://localhost:5000/api/courses/${query}`)
              .then(result => {
                this.setState({
                  course : result.data,
                  loading : false
                })
              })
              .catch(err => {
                //Error, redirect the user to error notfound path
                this.props.history.push('/notfound');
                console.log(err);
              })
      }
      
      render () {
        return (
          <div>
              <div className="bounds course--detail">
                {/* {If courses haven't yet finished fetching display loading} */}
                {this.state.loading ? <h1>Loading</h1> : 
                  <>
                    <ActionBar courseId={this.state.course._id} courseUserId={this.state.course.user._id}/>
                    <CourseContent 
                        courseTitle={this.state.course.title} 
                        courseInstructor={`${this.state.course.user.firstName} ${this.state.course.user.lastName}`} 
                        courseDescription={this.state.course.description}
                    />
                    <CourseMaterial 
                      materialsNeeded={this.state.course.materialsNeeded}
                      estimatedTime={this.state.course.estimatedTime}
                    />
                  </>
                  }
              </div>
          </div>
        )
      }
}
CourseDetail.contextType = UserContext;
export default CourseDetail;