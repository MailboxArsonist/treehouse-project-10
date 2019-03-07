import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => {
    return (
        <div>
            <Link className="button" to="/">Go Back</Link>
            <div>Looks like there was an error with the server...</div>
        </div>
    )
}

export default ServerError;