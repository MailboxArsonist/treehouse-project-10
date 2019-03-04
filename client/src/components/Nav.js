import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {
  console.log('rendered nav')
    return (
      <div className="header">
        <div className="bounds">
          <Link to="/"><h1 className="header--logo">Courses</h1></Link>
          <nav>{props.name ?
                <div>
                  <span>Welcome {props.name}</span>
                  <Link className="signout" to="/" onClick={props.signOut}>Sign Out</Link>
                </div>  
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