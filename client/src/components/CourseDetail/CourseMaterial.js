import React from 'react';
import ReactMarkdown from 'react-markdown';

const CourseMaterial = (props) => {
    
    const {materialsNeeded, estimatedTime} = props;

    return (
        <div className="grid-25 grid-right">
            <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4><img src={require('../../img/svg/004-alarm-clock.svg')} alt="windmill" className="course-title-svg"></img> Estimated Time</h4>
                        <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                        <h4><img src={require('../../img/svg/002-pencil.svg')} alt="windmill" className="course-title-svg"></img> Materials Needed</h4>
                        <ul>
                            <ReactMarkdown source={materialsNeeded}></ReactMarkdown>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CourseMaterial;