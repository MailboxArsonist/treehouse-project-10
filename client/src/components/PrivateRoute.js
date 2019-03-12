import React, {useContext, useEffect} from 'react';
import { Route, Redirect} from 'react-router-dom';
import {UserContext} from '../context/UserProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    //Grab the authenticated state from context 'true/false'
    const {authenticated, updateLocation, location} = useContext(UserContext);
    //grab the current url which will be passed to component on redirect, so a user will be redirected to the previous page after sign-in
    const currentLocation = {...rest.location}.pathname;
    //if url = createcourse redirect to signin, else its update route, so redirect to forbidden
    const pathname = currentLocation === '/courses/create' ? '/signin' : '/forbidden';

    //Update the location only if it has changed
    useEffect(() => {
        updateLocation(currentLocation);
    },[location]);

    //if authenticated render the passed component, otherwise redirect to pathname('/signin' or '/forbidden')
    return (
        <Route {...rest} render={props => (
            authenticated ? <Component {...props} /> : <Redirect to={pathname}/>
        )} />
    )
}

export default PrivateRoute;