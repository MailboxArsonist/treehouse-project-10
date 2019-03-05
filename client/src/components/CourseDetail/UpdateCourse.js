import React, {Component} from 'react';
import axios from 'axios';

class UpdateCourse extends Component {
    state = {
        loading : true,
        title : '',
        description : '',
        estimatedTime : '',
        materialsNeeded : '',
        user : ''
      }
    
    componentWillMount() {
        const courseId = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
              .then(result => {
                const { title, description, estimatedTime, materialsNeeded } = result.data;
                const user = result.data.user._id;
                this.setState({
                  loading : false,
                  title,
                  description,
                  estimatedTime,
                  materialsNeeded,
                  user,
                  courseId
                })
              })
              .catch(err => console.log(err))
    }

    //handles submit
    handleSubmit = (e) => {
        //prevent default
        e.preventDefault();
        //destructure state
        const { title, description, estimatedTime, materialsNeeded, user, courseId} = this.state;
        //check validation of inputs
        if(title !== '' && description !== '' && estimatedTime !== '' && materialsNeeded !== '' && user !== ''){
            //everything is good, lets make a PUT req.
            axios({
                method : 'put',
                url : `http://localhost:5000/api/courses/${courseId}`,
                auth: {
                    username: this.props.user.username,
                    password: this.props.user.password
                  },
                data : {
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                }
            }).then(() => {
                //redirect to updated course detail
                this.props.history.push(`/courses/${this.state.courseId}`);
            }).catch(err => {
                console.log(err);
            })
        }
    }
    //handles interaction on inputs, updates the state that matches the input name
    handleChange = (e) => {
        //validateForm(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){

        //what do i need to do
        //1. handler on each input, setState with input value.
        //2. handler on form, prevent default
        //3. Check required inputs are filled in
        //--Add a method that prints a required message
        //4.post request to api with state.
        //what problems do I have?
        //When a user has nothing, the placeholder comes back, maybe the handler will change this
        //Adding clientside validation means I don't do anything with the err.res. Add a catch that does the same as validation could be a solution
        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input onChange={this.handleChange} id="title" name="title" type="text" className="input-title course--title--input" placeholder={this.state.title} value={this.state.title}/></div>
                                {/* <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p> */}
                            </div>
                            <div className="course--description">
                                <div><textarea onChange={this.handleChange} id="description" name="description" className="" placeholder={this.state.description} value={this.state.description}></textarea></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder={this.state.estimatedTime} value={this.state.estimatedTime}/></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div><textarea onChange={this.handleChange} id="materialsNeeded" name="materialsNeeded" className="" placeholder={this.state.materialsNeeded} value={this.state.materialsNeeded}></textarea></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary">Cancel</button></div>
                    </form>
                </div>
            </div>
        )
    }
}
export default UpdateCourse;