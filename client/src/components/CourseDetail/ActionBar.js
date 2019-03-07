import React, {useContext} from 'react';
import { Link, withRouter} from 'react-router-dom';
import {UserContext} from '../../context/UserProvider';
import axios from 'axios';

const ActionBar = (props) => {
    console.log('rendered actionbar')
    const {userId, username, password} = useContext(UserContext);

    /*
    ** Makes a DELETE req to API
    */
    const deleteCourse = () => {
        axios.delete(`http://localhost:5000/api/courses/${props.courseId}`, {
            auth : {
                username,
                password
            }
        }).then(res => {
            //redirect user to homepage
            props.history.push('/');
        }).catch(err => {
            props.history.push('/error');
            console.log(err);
        })
    }
    return (
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    <span>
                        {userId === props.courseUserId && (
                            <>
                                <Link className="button" to={`/courses/${props.courseId}/update`}>Update Course</Link>
                                <button className="button" onClick={deleteCourse}>Delete Course</button>
                            </>
                        )}
                        
                    </span>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ActionBar);