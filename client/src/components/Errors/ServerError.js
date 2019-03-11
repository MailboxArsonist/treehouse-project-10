import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => {
    return (
        <div className="error-block">
            <Link className="button" to="/">Go Back</Link>
            <p>Sorry, it looks like there was an error with the server...</p>
        </div>
    )
}

export default ServerError;