import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {UserContext} from '../../context/UserProvider';

class UserSignIn extends Component {
	state = {
		emailAddress: "",
		password: "",
		attemptedSignIn: false,
		accessDenied: false,
		accessDeniedMessage : ''
		
	};

	/**
     * handles the form being submitted by making a post request with user name and password
     * @param  {Object} e - event object
     */
	handleSubmit = e => {
		e.preventDefault();
		const { emailAddress, password } = this.state;

		//check that the user has entered input in both inputs
		if (emailAddress.length > 0 && password.length > 0) {
			//all good, make the request
			axios.get("http://localhost:5000/api/users", {
					auth: {
						username: emailAddress,
						password: password
					}
				})
				.then(res => {
					if (res.status === 200 || res.status === 304) {
						const firstName = res.data[0].firstName;
						const lastName = res.data[0].lastName;
						const userId = res.data[0]._id;

						//sign the user in by calling signIn from UserContext, then redirect user to location
						this.context.signIn(emailAddress, password, firstName, lastName, userId, true);
						this.props.history.push(this.context.location);
					}
				})
				.catch(err => {
					console.log(err)
					//if err is 403 then forbidden, set state to save error message.
					if (err.response.status === 403) {
						this.setState({
							accessDenied : true,
							accessDeniedMessage : err.response.data.accessDenied
						});
					} else {
						//server error, redirect and console.log error
						this.props.history.push('/error');
						console.log(err)
					}
				});
		} else {
			//user didn't pass clientside validation, but attemted to sign in, so show error messages
			this.setState({attemptedSignIn: true});
		}
	};


	/**
     * handles interaction on inputs, updates the state that matches the input name, reset access denied
     * @param  {Object} e - Event object
     */
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			accessDenied : false
		});
	};


	/**
     * Will return an error message if the user tries to submit the form without all inputs correctly filled out
     * @param  {string} errorMessage - an error message string
     * @param  {string} inputName - name assigned to the input e.g. 'description'
     * @returns {string} a error message html string to be used as a component
     */
    errorMessage = (name, errorMessage) => {
        if(this.state.attemptedSignIn && this.state[name] === ''){
            return <span className="error-message">{errorMessage}</span>
        } else {
            return null;
        }
    }

	render() {
		return (
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign In</h1>
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								{this.state.accessDenied && <span className="error-message">{this.state.accessDeniedMessage}</span>}
								{this.errorMessage('emailAddress', 'You must enter your email address')}
								<input
									onChange={this.handleChange}
									id="emailAddress"
									name="emailAddress"
									type="text"
									className=""
									placeholder="Email Address"
								/>
							</div>
							<div>
								{this.errorMessage('password', 'You must enter your password')}
								<input
									onChange={this.handleChange}
									id="password"
									name="password"
									type="password"
									className=""
									placeholder="Password"
								/>
							</div>
							<div className="grid-100 pad-bottom">
								<button className="button" type="submit">
									Sign In
								</button>
								<Link className="button button-secondary" to="/">Cancel</Link>
							</div>
						</form>
					</div>
					<p>&nbsp;</p>
					<p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
				</div>
			</div>
		);
	}
}
UserSignIn.contextType = UserContext;
export default UserSignIn;
