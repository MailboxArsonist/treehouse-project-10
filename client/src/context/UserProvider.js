import React, { Component} from 'react';

//Create context
export const UserContext = React.createContext();

class UserProvider extends Component {
    state = {
        authenticated : null,
        username : null,
        password : null,
        name : null,
        id : null
      }
      //set the state to the authenticated user
      signIn = (username, password, name, authenticated, userId) => {
        console.log(name)
        if(authenticated){
          this.setState({
            authenticated,
            username,
            name,
            password,
            userId
          })
        } else {
          this.setState({
            authenticated : false,
            username : null,
            password : null,
            name : null,
            userId : null
          })
        }
      }
      //signs a user out by setting global state to null
      signOut = () => {
        this.setState({
          authenticated: null,
          username: null,
          password: null,
          name : null,
          userId : null
        })
      }

    render(){
        return(
            <UserContext.Provider value={{
                ...this.state,
                signIn : this.signIn,
                signOut : this.signOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;