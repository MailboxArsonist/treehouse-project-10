import React from 'react';
import ReactMarkdown from 'react-markdown';

const CourseContent = (props) => {
    const {courseTitle, courseInstructor, courseDescription} = props;

    return (
        <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label"><img src={require('../../img/svg/007-content.svg')} alt="windmill" className="course-title-svg"></img> Course</h4>
                <h3 className="course--title">{courseTitle}</h3>
                <p><img src={require('../../img/svg/001-woman.svg')} alt="windmill" className="course-title-svg"></img> By {courseInstructor}</p>
            </div>
            <div className="course--description">
                <ReactMarkdown source={courseDescription}></ReactMarkdown>
            </div>
        </div>
    )
}

export default CourseContent;