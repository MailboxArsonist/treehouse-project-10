import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        alreadyExists: false,
        validFirstName: null,
        validLastName: null,
        validEmail: null,
        validPassword: null,
    }

    //handles submit of form
    handleSubmit = (e) => {
        e.preventDefault();
        const {emailAddress, password, firstName, lastName, confirmPassword} = this.state;
        if(emailAddress !== '' && password !== '' && firstName !== '' && lastName !== '' && password === confirmPassword){
            //all good, make the request
            axios.post('http://localhost:5000/api/users', {
                firstName,
                lastName,
                emailAddress,
                password
            })
              .then(res => {
                  this.props.authenticateUser(emailAddress, password, firstName, true );
              })
              .catch(err => {
                  //check if error is conflict(already existing user)
                  if(err.response.status === 409){
                      //conflict, display error
                      this.setState({alreadyExists: true});
                  }
                console.log(err.response);
              });
        }
    }

    checkIfExists = () => {
        if(this.state.alreadyExists){
            return(
                <div className="validation--duplicate">Looks like you already have an account:<Link to="/signin"> Sign In</Link></div>
            );
        } else {
            return null;
        }
    }
    //handles interaction on inputs, updates the state that matches the input name
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //check for a valid email address
    isValidEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    //check for firstname & lastname
    isValidName = (name) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(name);
    }
    //check for a valid password

    render(){
        console.log('rendered signup')
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>{this.checkIfExists()}<input onChange={this.handleChange} id="firstName" name="firstName" type="text" className="" placeholder="First Name" /></div>
                            <div><input onChange={this.handleChange} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" /></div>
                            <div><input onChange={this.handleChange} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
                            <div><input onChange={this.handleChange} id="password" name="password" type="password" className="" placeholder="Password" /></div>
                            <div><input onChange={this.handleChange} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;