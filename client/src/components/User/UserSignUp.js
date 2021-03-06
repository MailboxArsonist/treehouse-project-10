import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../../context/UserProvider';

class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        alreadyExists: false,
        attemptedSubmit: false
    }

    /**
     * handles the form being submitted by making a post request with user name and password
     * @param  {Object} e - event object
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const {emailAddress, password, firstName, lastName} = this.state;

        //call validators
        if(this.isValid('firstName') && this.isValid('lastName') && this.isValid('emailAddress') && this.isValid('password') && this.isValid('confirmPassword')){
            //all good, make the request
            axios.post('/api/users', {
                firstName,
                lastName,
                emailAddress,
                password
            })
              .then(res => {
                  const userId = res.data._id;
                  //update context then redirect user
                  this.context.signIn(emailAddress, password, firstName, lastName, userId, true);
                  this.props.history.push(this.context.location);
              })
              .catch(err => {
                  //check if error is conflict(already existing user)
                  if(err.response.status === 409){
                      //conflict, display error
                      this.setState({alreadyExists: true});
                  } else {
                      //server error, render error component
                      this.props.history.push('/error');
                  }
                console.log(err.response);
              });
        }else {
            //didn't pass clientside validation, set attempted submit to true to display error messages
            this.setState({attemptedSubmit: true});
        }
    }

     /**
     * Checks to see if alreadyExists : true, displays error message
     * @returns  {string} html error message string or null
     */
    checkIfExists = () => {
        if(this.state.alreadyExists){
            return(
                <div className="validation--duplicate">Looks like you already have an account:<Link to="/signin"> Sign In</Link></div>
            );
        } else {
            return null;
        }
    }

    /**
     * handles interaction on inputs, updates the state that matches the input name, reset access denied
     * @param  {Object} e - Event object
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    /**
     * Tests a value in this.state and returns a boolean
     * @param  {string} InputName - name assigned to the input e.g. 'description'
     * @returns {boolean} 
     */
    isValid = (inputName) => {
        const email = this.state.emailAddress;
        const pass = this.state.password;
        const confirmPass = this.state.confirmPassword;
        const fName = this.state.firstName;
        const lName = this.state.lastName;
        switch (inputName) {
            case 'emailAddress':
                return /^[^@]+@[^@.]+\.[a-z]+$/.test(email);
            case 'password':
                return /^(?=.*\d).{8,}$/.test(pass); 
            case 'confirmPassword':
                return  pass === confirmPass;                     
            case 'firstName':
                return /^[a-z A-Z]+$/.test(fName);
            case 'lastName':
                return /^[a-z A-Z]+$/.test(lName);
            default:
                break;
        }
    }


    /**
     * Will return an error message if the user tries to submit the form without all inputs correctly filled out
     * @param  {string} name - name assigned to the input e.g. 'description'
     * @param  {string} errorMessage - an error message string 
     * @returns {string} a error message html string to be used as a component
     */
    errorMessage = (name, errorMessage) => {
        if(this.state.attemptedSubmit && !this.isValid(name)){
            //form has been submitted and this input was incorrectly filled in.
            return <label className="error-message">{errorMessage}</label>
        } else {
            return null;
        }
    }

    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>

                            {/* {CheckIfExists and errorMessage will display error messages if necessary} */}

                            {this.checkIfExists()}
                            <div>{this.errorMessage('firstName', 'Required Field')}<input onChange={this.handleChange} id="firstName" name="firstName" type="text" className="" placeholder="First Name" /></div>
                            <div>{this.errorMessage('lastName','Required Field')}<input onChange={this.handleChange} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" /></div>
                            <div>{this.errorMessage('emailAddress','Required Field - Must be a valid email address')}<input onChange={this.handleChange} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
                            <div>{this.errorMessage('password','Required Field - Minimum 8 letters & 1 number')}<input onChange={this.handleChange} id="password" name="password" type="password" className="" placeholder="Password" /></div>
                            <div>{this.errorMessage('confirmPassword','Oops, your passwords are not the same')}<input onChange={this.handleChange} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

UserSignUp.contextType = UserContext;
export default UserSignUp;