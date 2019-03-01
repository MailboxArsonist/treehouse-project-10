import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
    }
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
                  console.log(res)
              })
              .catch(err => {
                console.log(err.response);
              });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        console.log('rendered')
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input onChange={this.handleChange} id="firstName" name="firstName" type="text" className="" placeholder="First Name" /></div>
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