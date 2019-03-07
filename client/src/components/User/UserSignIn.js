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
	handleSubmit = e => {
		e.preventDefault();
		const { emailAddress, password } = this.state;
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
						this.context.signIn(emailAddress, password, firstName, lastName, userId, true);
						const path = this.props.location.state ? this.props.location.state.from : '/';
						this.props.history.push(path);
					}
				})
				.catch(err => {
					console.log(err)
					//come back to here and add in the
					if (err.response.status === 403) {
						this.setState({
							accessDenied : true,
							accessDeniedMessage : err.response.data.accessDenied
						});
					} else {
						//server error
						console.log(err)
					}
				});
		} else {
			this.setState({attemptedSignIn: true});
		}
	};
	//handles changes to the input, set state = to input value. Reset access denied to remove any error message
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			accessDenied : false
		});
	};

	//Will return an error message if the user tries to submit the form without all inputs correctly filled out
    errorMessage = (name, errorMessage) => {
        if(this.state.attemptedSignIn && this.state[name] === ''){
            //form has been submitted and this input was incorrectly filled in.
            return <label>{errorMessage}</label>
        } else {
            return null;
        }
    }

	render() {
		console.log("rendered signin");
		return (
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign In</h1>
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								{this.state.accessDenied && <label>{this.state.accessDeniedMessage}</label>}
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
