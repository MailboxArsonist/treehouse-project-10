import React, { Component } from 'react';
import {UserContext} from '../../context/UserProvider';

class UserSignOut extends Component {
    //authenticate user to null, clear any cache/cookies, redirect to courses
    componentWillMount(){
        this.context.signOut();
        this.props.history.push('/');
    }
    render(){
        return null
    }
}
UserSignOut.contextType = UserContext;
export default UserSignOut;