import React from "react";
import logo from "../static/nav_logo.svg";
import addToCart from "../static/shopping-cart.png";
import route from "../static/route.png";
import search from "../static/search_route.png";
import "../styles/components/ServiceInfo.css";

function ServiceInfo() {
  return (
    <div className="serviceInfo">
      <div className="line"></div>
      <div className="service-header">
        <img src={logo} />
        <div className="logo-subtitle">Pick your Trip!</div>
      </div>
      <div className="service-content">
        <div className="item">
          <img className="icon" src={addToCart} />
          <div className="item-title">여행을 쇼핑처럼!</div>
          <div className="item-title">장바구니에 루트를 담아보자!</div>
          <div className="item-description">다른 사람이 작성한 루트와 장소들을 폴더별로 내 장바구니에 담아보세요. 카트에 담긴 장소들을 조합해서 나만의 여행 계획을 세울 수 있어요!</div>
        </div>
        <div className="item">
          <img className="icon" src={route} />
          <div className="item-title">지금껏 아껴왔던 나의 플랜,</div>
          <div className="item-title">남들과 공유하자!</div>
          <div className="item-description">완벽한 여행을 계획한 당신! 많은 사람들에게 이 여행을 소개해주고 싶나요? 루트를 작성하고 잊지 말고 &apos;Share&apos; 버튼을 꾸욱!</div>
        </div>
        <div className="item">
          <img className="icon" src={search} />
          <div className="item-title">나의 여행취향에 맞는</div>
          <div className="item-title">여행계획 검색해보기!</div>
          <div className="item-description">여기저기 흩어져있는 여행 정보를 찾는데 지쳤다면? 장소, 계절, 테마, 일정, 교통수단까지 필터링 가능한 검색 기능을 적극 활용해보세요!</div>
        </div>
      </div>
    </div>
  );
}

export default ServiceInfo;
