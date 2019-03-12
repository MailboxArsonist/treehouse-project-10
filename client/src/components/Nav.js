import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserProvider';

const Nav = (props) => {
  //Get firstName and signout method from context
  const {firstName, signOut} = useContext(UserContext);

    return (
      <div className="header">
        <div className="bounds">
          <Link to="/"><h1 className="header--logo">Courses</h1></Link>
          {/* {If firstName exists then a user is logged in, so welcome and signout are rendered, otherwise signin and signup} */}
          <nav>{firstName ?
                <div>
                  <span>Welcome {firstName}</span>
                  <Link className="signout" to="/" onClick={signOut}>Sign Out</Link>
                </div>  
                :
                <>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </>
                }
          </nav>
        </div>
      </div>
    )
}

export default Nav;