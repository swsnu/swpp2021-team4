import React, { useState , useEffect} from "react";
import { Redirect, useParams  } from "react-router-dom";
import '../styles/components/Userinfo.scss';
import { useSelector } from 'react-redux';
//import { useDispatch } from "react-redux";
import axios from "axios";
//import {UserStateType} from "../store/User/userReducer";
import logo from '../static/profile.png';
import { RootReducerType } from "../store/store";
function UserInfo() {
  interface String{
    id:string
  }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  console.log(loggedUser);
  const [userInfo, setUserInfo] = useState(
    {profileImage:'', email:'', username:''}
  );
  const onEditProfile = () => {
    setIsSubmitted(true);
  }


  const {id} = useParams<String>();

  useEffect(() => {
       axios.get(`/user/${id}/`)
        .then(function(response) {
          setUserInfo(response.data);
        })
        .catch((err) => err.response);
  }, [id])

  if (isSubmitted) {
    return <Redirect to="/edit_profile/" />;
  }
  return (
    <div className="userinfo-container">
      <div className="profile">Profile</div>     
       <div className="showProfile">
        <div className="image">
        <img className="profileImage" src={logo}/>
        </div>
        <div className="basicInfo">
          <div className="email">
            <div className="field">E-mail</div>
            <div className="value">{userInfo.email}</div> 
            
          </div>
          <div className="line"></div>
          <div className="name">
          <div className="field">username</div>
          <div className="value">{userInfo.username}</div> 
          </div>
          <div className="line"></div>
          <button className="edit-btn" onClick={onEditProfile}>
          Edit
          </button>
        
      </div>
      {
           (loggedUser?.id ?? 0 )==id &&
      <div className="Folder">

      </div>
}

        
    
    </div>
    </div>
  )
}

export default UserInfo;
