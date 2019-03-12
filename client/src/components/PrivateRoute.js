import React, {useContext, useEffect} from 'react';
import { Route, Redirect} from 'react-router-dom';
import {UserContext} from '../context/UserProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    //Grab the authenticated state from context 'true/false'
    const {authenticated, updateLocation, location} = useContext(UserContext);
    //grab the current url which will be passed to component on redirect, so a user will be redirected to the previous page after sign-in
    const currentLocation = {...rest.location}.pathname;
    //if url = createcourse redirect to signi
    const pathname = currentLocation === '/courses/create' ? '/signin' : '/forbidden';
    //else its update, redirect to forbidden
    // updateLocation(currentLocation);
    useEffect(() => {
        updateLocation(currentLocation);
    },[location]);


    return (
        <Route {...rest} render={props => (
            authenticated ? <Component {...props} /> : <Redirect to={pathname}/>
        )} />
    )
}

export default PrivateRoute;