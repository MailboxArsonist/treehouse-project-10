import React from 'react';
import ReactMarkdown from 'react-markdown';

const CourseContent = (props) => {
    
    const {courseTitle, courseInstructor, courseDescription} = props;

    return (
        <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{courseTitle}</h3>
                <p>{courseInstructor}</p>
            </div>
            <div className="course--description">
                <ReactMarkdown source={courseDescription}></ReactMarkdown>
            </div>
        </div>
    )
}

export default CourseContent;