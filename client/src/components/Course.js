import React from 'react';
import {Link} from 'react-router-dom';

const Course = (props) => {
    return (
        <div className="grid-33">
            <Link className="course--module course--link" to={`courses/${props.courseId}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title"><img src={require('../img/svg/008-online-learning.svg')} alt="learning" className="course-title-svg"></img> {props.title}</h3>
            </Link>
        </div>
    )
}

export default Course;