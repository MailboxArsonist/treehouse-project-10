import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../context/UserProvider';

class CreateCourse extends Component {
    state = {
        title : '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        attemptedSubmit : false
    }

    /**
     * handles the form being submitted by making a post request with course info
     * @param  {Object} e - event object
     */
    handleSubmit = (e) => {
        //prevent default to stop the form submitting
        e.preventDefault();
        //destructure state & context
        const { title, description, estimatedTime, materialsNeeded} = this.state;
        const {username, password} = this.context;

        //check validation of inputs
        if(this.validateInput('title') && this.validateInput('description') && this.validateInput('estimatedTime') && this.validateInput('materialsNeeded')){
            //everything is good, lets make a POST req.
            axios({
                method : 'post',
                auth : {
                    username,
                    password
                },
                url : '/api/courses',
                data : {
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                }
            }).then((res) => {
                //redirect to updated course detail
                //we should already have the location set by the api
                const path = res.headers.location;
                this.props.history.push(path)
            }).catch(err => {
                console.log(err);
                this.props.history.push('/error');
            })
        } else {
            //didnt meet validation, set attemptedSubmit : true to show error messages
            this.setState({attemptedSubmit : true});
        }
    }

    /**
     * @param  {Object} e - Event object - handles interaction on inputs, updates the state that matches the input name
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /**
     * Creates an error message if user tries to submit the form and the 'inputName' fails validation
     * @param  {string} errorMessage - an error message string
     * @param  {string} inputName - name assigned to the input e.g. 'description'
     * @returns {string} a error message html string to be used as a component
     */
    createErrorMessage = (errorMessage, inputName) => {
        //check if user tried to submit form, if true then display the error message
        if(this.state.attemptedSubmit && !this.validateInput(inputName)){
            return (
                <span className="error-message">{errorMessage}</span>
            )
        }
    }

    /**
     * Replaces any line breaks in a string
     * @param  {String} str - String containing courseMaterials or estimatedTime info
     * @returns {string} returns a new string with line breaks removed
     */
    trim = (str) => {
        return str.replace(/(\r\n|\n|\r)/gm,"");
    }

    /**
     * Tests a value in this.state and returns a boolean
     * @param  {string} InputName - name assigned to the input e.g. 'description'
     * @returns {boolean} 
     */
    validateInput = (inputName) => {
        const courseTitle = this.state.title;
        const courseEstimatedTime = this.state.estimatedTime;
        const courseDescription = this.trim(this.state.description);
        const courseMaterials = this.trim(this.state.materialsNeeded);
        switch (inputName) {
            case 'title':
                return /^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseTitle);
            case 'description':
                return /^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseDescription); 
            case 'estimatedTime':
                return /^(?=.*[A-Z,a-z,\d]).{2,}$/.test(courseEstimatedTime);                    
            case 'materialsNeeded':
                return /^(?=.*[A-Z,a-z,\d]).{3,}$/.test(courseMaterials);
            default:
                break;
        }
    }
    render(){
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label"><img src={require('../img/svg/007-content.svg')} alt="windmill" className="course-title-svg"></img> Course {this.createErrorMessage('- *Required', 'title')}</h4>
                                <div><input onChange={this.handleChange} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." /></div>
                                <p><img src={require('../img/svg/001-woman.svg')} alt="windmill" className="course-title-svg"></img> By {this.context.firstName} {this.context.lastName}</p>
                            </div>
                            <div className="course--description">
                                <h4>Course Description {this.createErrorMessage('- *Required', 'description')}</h4>
                                <div><textarea onChange={this.handleChange} id="description" name="description" className="" placeholder="Course description..."></textarea></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4><img src={require('../img/svg/004-alarm-clock.svg')} alt="windmill" className="course-title-svg"></img> Estimated Time {this.createErrorMessage('- *Required', 'estimatedTime')}</h4>
                                        <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" /></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4><img src={require('../img/svg/002-pencil.svg')} alt="windmill" className="course-title-svg"></img> Materials Needed {this.createErrorMessage('- *Required', 'materialsNeeded')}</h4>
                                        <div><textarea onChange={this.handleChange} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></textarea></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                    </form>
                </div>
            </div>
        )
    }
}

CreateCourse.contextType = UserContext;
export default CreateCourse;