import React, {Component} from 'react';
import axios from 'axios';


//import components
import ActionBar from './ActionBar';
import CourseContent from './CourseContent';
import CourseMaterial from './CourseMaterial';

class CourseDetail extends Component {
    state = {
        loading : true,
        course : []
      }
    
      componentDidMount() {
        const query = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${query}`)
              .then(result => {
                this.setState({
                  course : result.data,
                  loading : false
                })
              })
              .catch(err => console.log(err))
      }
      render () {
        console.log('course detail rendered')
          return (
            <div>
                <div className="bounds course--detail">
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

export default CourseDetail;