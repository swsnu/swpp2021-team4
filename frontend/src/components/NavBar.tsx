import React, { useEffect, useState } from "react";
import './NavBar.css';
import logo from '../static/nav_logo.svg';

function NavBar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!isLogged && sessionStorage.getItem('isAuthorized') === 'true') {
      setIsLogged(true);
    }
  }, []);

  const renderSignBtn = () => {
    if (isLogged) {
      return (
        <div className="nav-sign-btn nav-sign-font">
          Sign Out
        </div>
      )
    } else {
      return (
        <>
          <div className="nav-sign-btn nav-sign-font">
            Sign up
          </div>
          <div className="nav-sign-btn nav-sign-font">
            Sign in
          </div>
        </>
      )
    }
  }

  return (
    <div className="nav-container">
      <img src={logo} />
      <div className="nav-btn-container">
        
        <div className="nav-create-btn nav-btn-font">
          Create Route
        </div>

        {
          isLogged &&
          <div className="nav-mypage-btn nav-btn-font">
            My Page
          </div>
        }
        
        {renderSignBtn()}
      </div>
    </div>
  )
}

export default NavBar;
