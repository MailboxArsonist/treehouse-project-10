import { Component } from 'react';
import {UserContext} from '../../context/UserProvider';

class UserSignOut extends Component {
    //authenticate user to null, clear any cookies, redirect to courses
    componentWillMount(){
        this.context.signOut();
        this.props.history.push('/');
    }
    //component doesn't render anything, just used to log out a user on '/signout' route
    render(){
        return null
    }
}
UserSignOut.contextType = UserContext;
export default UserSignOut;