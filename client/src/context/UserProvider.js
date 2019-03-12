import React, { Component} from 'react';
import { withCookies } from 'react-cookie';
//Create context
export const UserContext = React.createContext();

class UserProvider extends Component {
  //need locations for courses, createcourse updatecourse
    state = {
        authenticated : null,
        username : null,
        password : null,
        firstName : null,
        lastName : null,
        userId : null,
        location : '/'
      }
      //set the state to the authenticated user && set the cookie
      signIn = (username, password, firstName, lastName, userId, authenticated) => {
        if(authenticated){
          const { cookies } = this.props;
          this.setState({
            authenticated,
            username,
            firstName,
            lastName,
            password,
            userId
          })
          //then set cookies
          const userCookie = {
            authenticated,
            username,
            firstName,
            lastName,
            password,
            userId
          };
          cookies.set('user', JSON.stringify(userCookie), { path: '/' });
        } else {
          this.setState({
            authenticated : false,
            username : null,
            password : null,
            firstName : null,
            lastName: null,
            userId : null
          })
        }
      }
      //signs a user out by setting global state to null && clear the cookie
      signOut = () => {
        const { cookies } = this.props;
        this.setState({
          authenticated: null,
          username: null,
          password: null,
          firstName : null,
          lastName : null,
          userId : null,
          location : '/'
        })
        cookies.remove('user', { path: '/' });
      }

      updateLocation = (pathname) => {
        this.setState({location : pathname});
      }

    render(){
      let userInfo;
      const { cookies } = this.props;
      const userCookies = cookies.get('user');
      //if authenticated is false && cookie auth is true render with cookie, otherwise render with normal info.
      if(!this.state.authenticated && userCookies){
        userInfo = userCookies;
      } else {
        userInfo = {...this.state}
      }
        return(
            <UserContext.Provider value={{
                ...userInfo,
                signIn : this.signIn,
                signOut : this.signOut,
                updateLocation : this.updateLocation
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default withCookies(UserProvider);