import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/components/NavBar.css';
import logo from '../static/nav_logo.svg';
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../store/store";
import { signoutAction } from "../store/User/userAction";

interface PropType {
  location?: any
}

function NavBar(props: PropType) {
  const { location } = props;
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    if (!isLogged && localStorage.getItem('isAuthorized') === 'true') {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      localStorage.removeItem('isAuthorized');
      setIsLogged(false);
    }
  }, [isLoggedOut])

  const onClickSignoutButton = () => {
    dispatch(signoutAction());
    setIsLoggedOut(true);
  }

  const renderSignBtn = () => {
    if (isLogged) {
      return (
        <div
          className="nav-sign-btn nav-sign-font"
          onClick={onClickSignoutButton}
        >
          Sign Out
        </div>
      )
    } else {
      return (
        <>
          {
            props.location?.pathname !== '/signup/' &&
            <NavLink
              to="/signup/"
              className="nav-sign-btn nav-sign-font"
            >
              Sign up
            </NavLink>
          }

          {
            props.location?.pathname !== '/signin/' &&
            <NavLink
              to="/signin/"
              className="nav-sign-btn nav-sign-font"
            >
              Sign in
            </NavLink>
          }
        </>
      )
    }
  }

  return (
    <div
      className={
        "nav-container" + (location?.pathname === '/signin/' || location?.pathname === '/signup/' ? ' vague' : '')
      }
    >
      <NavLink to="/main/">
        <img className="logo" src={logo} />
      </NavLink>
      <div className="nav-btn-container">

        <NavLink
          to="/post/create/"
          className="nav-create-btn nav-btn-font"
          activeClassName="nav-btn-font-active"
        >
          Create Route
        </NavLink>

        {
          isLogged &&
          <div className="nav-mypage-btn nav-btn-font">
            <NavLink
              to={`/user_info/${loggedUser?.id ?? 0}/`}
              className="nav-mypage-btn nav-btn-font"
              activeClassName="nav-btn-font-active"
            >
              My Page
            </NavLink>
          </div>
        }

        {renderSignBtn()}
      </div>
    </div>
  )
}

export default NavBar;
