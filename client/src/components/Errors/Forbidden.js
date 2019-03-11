import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="error-block">
            <h1>Hey, you there!</h1>
            <p>You need to be signed in to view this page</p>
            <Link to="/signin">Sign in</Link>
        </div>
    )
}

export default Forbidden;