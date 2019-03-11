import React, {Component} from 'react';
import axios from 'axios';
import {UserContext} from '../../context/UserProvider';
import {Link} from 'react-router-dom';

class UpdateCourse extends Component {
    state = {
        loading : true,
        title : '',
        description : '',
        estimatedTime : '',
        materialsNeeded : '',
        user : '',
        attemptedSubmit : false
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
        //prevent default to ensure form does not submit 
        e.preventDefault();
        //destructure state
        const { title, description, estimatedTime, materialsNeeded, user, courseId} = this.state;
        //check validation of inputs
        if(this.validateInput('title') && this.validateInput('description') && this.validateInput('estimatedTime') && this.validateInput('materialsNeeded') && user !== ''){
            //everything is good, lets make a PUT req.
            axios({
                method : 'put',
                url : `http://localhost:5000/api/courses/${courseId}`,
                auth: {
                    username: this.context.username,
                    password: this.context.password
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
        } else {
            //form did not submit correctly because of missing fields.
            this.setState({attemptedSubmit : true});
        }
    }

    /**
     * @param  {Object} e - Event object - handles interaction on inputs, updates the state that matches the input name
     */
    handleChange = (e) => {
        //validateForm(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /**
     * Creates an error message if user tries to submit the form and the 'inputName' fails validation
     * @param  {string} errorMessage - an error message string
     * @param  {string} inputName - name assigned to the input e.g. 'description'
     */
    createErrorMessage = (errorMessage, inputName) => {
        //check if user tried to submit form, if true then display the error message
        if(this.state.attemptedSubmit && !this.validateInput(inputName)){
            return (
                <span className="error-message">{errorMessage}</span>
            )
        }
    }

    //Method to cut out any line breaks in courseDescription and courseMaterials
    trim = (str) => {
        return str.replace(/(\r\n|\n|\r)/gm,"");
    }

    validateInput = (inputName) => {
        const courseTitle = this.state.title;
        const courseEstimatedTime = this.state.estimatedTime;
        const courseDescription = this.trim(this.state.description);
        const courseMaterials = this.trim(this.state.materialsNeeded);
        //what do i need to do?
        //title and descrip need to be >= 3 char
        //remove line break from both text area
        switch (inputName) {
            case 'title':
                console.log(/^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseTitle));
                return /^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseTitle);
            case 'description':
                return /^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseDescription); 
            case 'estimatedTime':
            console.log(/^(?=.*[A-Z,a-z,\d]).{2,}$/.test(courseEstimatedTime))
                return /^(?=.*[A-Z,a-z,\d]).{2,}$/.test(courseEstimatedTime);                    
            case 'materialsNeeded':
                console.log(/^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseMaterials))
                return /^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseMaterials);
            default:
                break;
        }
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
                                <h4 className="course--label"><img src={require('../../img/svg/007-content.svg')} alt="windmill" className="course-title-svg"></img> Course {this.createErrorMessage('- *Required', 'title')}</h4>
                                <div><input onChange={this.handleChange} id="title" name="title" type="text" className="input-title course--title--input" placeholder={this.state.title} value={this.state.title}/></div>
                                <p><img src={require('../../img/svg/001-woman.svg')} alt="windmill" className="course-title-svg"></img> By {this.context.firstName} {this.context.lastName}</p>
                            </div>
                            <div className="course--description">
                                <h4 className="course--label">Description {this.createErrorMessage('- *Required', 'description')}</h4>
                                <div><textarea onChange={this.handleChange} id="description" name="description" className="" placeholder={this.state.description} value={this.state.description}></textarea></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4><img src={require('../../img/svg/004-alarm-clock.svg')} alt="windmill" className="course-title-svg"></img> Estimated Time {this.createErrorMessage('- *Required', 'estimatedTime')}</h4>
                                        <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder={this.state.estimatedTime} value={this.state.estimatedTime}/></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4><img src={require('../../img/svg/002-pencil.svg')} alt="windmill" className="course-title-svg"></img> Materials Needed {this.createErrorMessage('- *Required', 'materialsNeeded')}</h4>
                                        <div><textarea onChange={this.handleChange} id="materialsNeeded" name="materialsNeeded" className="" placeholder={this.state.materialsNeeded} value={this.state.materialsNeeded}></textarea></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to="/"className="button button-secondary">Cancel</Link></div>
                    </form>
                </div>
            </div>
        )
    }
}
UpdateCourse.contextType = UserContext;
export default UpdateCourse;