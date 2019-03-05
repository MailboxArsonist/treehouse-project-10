import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../../context/UserProvider';

const ActionBar = (props) => {
    console.log('rendered actionbar')
    const {userId} = useContext(UserContext);
    console.log(userId);
    console.log(props.userId)
    //what i need to do
    //1. Check to see if user Id from aut user matches user id from courseDetail
    //If they don't match, dont render update and delete
    return (
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    <span>
                        {userId === props.courseUserId && (
                            <>
                                <Link className="button" to={`/courses/${props.courseId}/update`}>Update Course</Link>
                                <Link className="button" to="#">Delete Course</Link>
                            </>
                        )}
                        
                    </span>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
        </div>
    )
}

export default ActionBar;