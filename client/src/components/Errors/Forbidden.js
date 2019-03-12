import React from 'react';

const Forbidden = () => {
    return (
        <div className="error-block">
            <h1>Hey, you there, you don't have access to this page!</h1>
            <p>You need to be signed in to view this page</p>
        </div>
    )
}

export default Forbidden;