import React, { Component} from 'react';
import { withCookies } from 'react-cookie';
//Create context
export const UserContext = React.createContext();

class UserProvider extends Component {
    state = {
        authenticated : null,
        username : null,
        password : null,
        firstName : null,
        lastName : null,
        userId : null,
        location : '/'
      }

      /**
      * Will return an error message if the user tries to submit the form without all inputs correctly filled out
      * @param  {string} userName - users email
      * @param  {string} password - users password
      * @param  {string} firstName - users first name
      * @param  {string} lastName - users last name
      * @param  {string} userId - random user id
      * @param {boolean} authenticated 
      */
      signIn = (username, password, firstName, lastName, userId, authenticated) => {

        //if authenticated is true set the state
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
          //then set cookies the same values, cookies are used as a backup
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
          //authnticated = false so to be sure update all values to null
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


      /**
      * signs a user out by setting global state to null && clears the cookies
      */
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


      /**
      * Some routes call update location to keep the url, so when a user signs in/signs up they can be directed to the correct page
      * @param {string} pathname - url to update location
      */
      updateLocation = (pathname) => {
        this.setState({location : pathname});
      }

    render(){
      //user info will hold the state or cookies as backup
      let userInfo;
      const { cookies } = this.props;
      //get user cookie
      const userCookies = cookies.get('user');

      //if this.state doesn't hold a user, check to see if cookies does, if so, use the cookies data
      if(!this.state.authenticated && userCookies){
        userInfo = userCookies;
      } else {
        //this.state already holds the data, so use that
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