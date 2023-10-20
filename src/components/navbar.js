import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';

const Navbar = (props) => {
    const { email } = props;
    const navigate = useNavigate();

    const Logout = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    }

  return (
    <nav className="nav">
      <h2 className="site-title">
        Email : {email}
      </h2>
      <ul>
        <h2><a id='Logout' href="#" onClick={Logout}>Log ut</a></h2>
      </ul>
    </nav>
  );
};

export default Navbar;