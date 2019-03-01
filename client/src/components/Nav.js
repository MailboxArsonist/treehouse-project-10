import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {

    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>{props.name ?
                <>
                  <p>Welcome {props.name}</p>
                  <Link className="signout" to="/signout">Sign Out</Link>
                </>  
                :
                <>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </>
                }</nav>
        </div>
      </div>
    )
}

export default Nav;