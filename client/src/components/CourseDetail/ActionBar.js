import React from 'react';
import { Link } from 'react-router-dom';

const ActionBar = () => {
    return (
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    <span>
                        <Link className="button" to="update-course.html">Update Course</Link>
                        <Link className="button" to="#">Delete Course</Link>
                    </span>
                    <Link className="button button-secondary" to="index.html">Return to List</Link>
                </div>
            </div>
        </div>
    )
}

export default ActionBar;