import React, {useContext} from 'react';
import { Route, Redirect} from 'react-router-dom';
import {UserContext} from '../context/UserProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    /* What is this going to do?
            Accept the component as an argument. create and update
            if user is authenticated, render the component, otherwise redirect to signin.
    *   what problems do I have? 
            How do I get the props through to the correct routes?
     */

    const {authenticated} = useContext(UserContext);
    const currentLocation = {...rest.location}.pathname;
    return (
        <Route {...rest} render={props => (
            authenticated ? <Component {...props} /> : <Redirect to={{pathname: '/signin', state:{from:currentLocation}}}/>
        )} />
    )
}

export default PrivateRoute;