import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../static/nav_logo.svg";
import addToCart from "../static/shopping-cart.png";
import route from "../static/route.png";
import search from "../static/search_route.png";
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
      <div className="service-content">
        <div className="item">
          <img className="icon" src={addToCart} />
          <div className="icon-expl">
            여행을 쇼핑처럼!
            <br />
            장바구니에 루트를 담아보자!
          </div>
        </div>
        <div className="item">
          <img className="icon" src={route} />
          <div className="icon-expl">
            지금껏 아껴왔던 나의 플랜,
            <br />
            남들과 공유하자!
          </div>
        </div>
        <div className="item">
          <img className="icon" src={search} />
          <div className="icon-expl">
            나의 여행취향에 맞는
            <br />
            여행계획 검색해보기!
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceInfo;
