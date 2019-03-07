import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserProvider';

const Nav = (props) => {
  console.log('rendered nav')
  const {firstName, signOut} = useContext(UserContext);
  console.log(firstName)

    return (
      <div className="header">
        <div className="bounds">
          <Link to="/"><h1 className="header--logo">Courses</h1></Link>
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