import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../static/nav_logo.svg";
import "../styles/components/ServiceInfo.css";

function ServiceInfo() {
  return (
    <div className="serviceInfo">
      <div className="explanation">
        <div className="logo">
          <NavLink to="/main/">
            <img className="logo" src={logo} />
          </NavLink>
        </div>
        <div className="service-header">Pick your Trip!</div>
      </div>
      <div className="service-content"></div>
    </div>
  );
}

export default ServiceInfo;
