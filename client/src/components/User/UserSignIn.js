import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {emailAddress, password} = this.state;
        if(emailAddress.length > 0 && password.length > 0){
            //all good, make the request
            axios({
                method: 'get',
                url : 'http://localhost:5000/api/users',
                auth: {
                username: emailAddress,
                password: password
              }})
              .then(res => {
                  if(res.status === 200 || res.status === 304){
                      const name = res.data.firstName
                      this.props.authenticateUser(emailAddress, password, name, true);
                  }
              })
              .catch(err => {
                  //come back to here and add in the 
                  if(err.response.status === 403){
                    this.props.authenticateUser();
                  }
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
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input onChange={this.handleChange} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
                            <div><input onChange={this.handleChange} id="password" name="password" type="password" className="" placeholder="Password" /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary">Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn;