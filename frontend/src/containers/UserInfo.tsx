import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "../styles/components/Userinfo.scss";
import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
import axios from "axios";
//import {UserStateType} from "../store/User/userReducer";
import logo from "../static/profile.png";
import { RootReducerType } from "../store/store";
import button_up from '../static/chevron-down.svg';
import button_down from '../static/chevron-up.svg';
import vector from '../static/Vector.svg';
function UserInfo() {
  interface String {
    id: string;
  }
  const [toggle, setToggle] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [folder, setFolderSelect] = useState([
    {
      id: 0,
      name: "hi",
      posts: [],
    },
  ]);
  const { loggedUser } = useSelector((state: RootReducerType) => state.user);

  const [userInfo, setUserInfo] = useState({
    profile_image: "",
    email: "",
    username: "",
  });
  const onEditProfile = () => {
    setIsSubmitted(true);
  };

  const { id } = useParams<String>();

  const onFolderClick = () =>{
    
  }
  useEffect(() => {
    axios
      .get(`/user/${id}/`)
      .then(function (response) {
        setUserInfo(response.data);
      
      })
      .catch((err) => err.response);

    if (id == loggedUser.id) {
      axios
        .get(`/user/${id}/folder/`)
        .then(function (response) {
          setFolderSelect(response.data);
          console.log(response)
        })
        .catch((err) => err.response);
    }
  }, [id]);

  if (isSubmitted) {
    return <Redirect to="/edit_profile/" />;
  }

  return (
    <div className="userinfo-container">
      <div className="profile">Profile</div>
      <div className="showProfile">
        <div className="image">
          {userInfo.profile_image==null&&<img className="profileImage" src={logo} />}
          {userInfo.profile_image!=null&&<img className="profileImage" src={userInfo.profile_image} />}
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
          {(loggedUser?.id ?? 0) == id && (
            <button className="edit-btn" onClick={onEditProfile}>
              Edit
            </button>
          )}
        </div>
      </div>
      {(loggedUser?.id ?? 0) == id && (
        <div className="Folder">
          <div className="left">
            <div className="folderHead">Folders
            {toggle&&<img className="icon" src={button_up} onClick={() => setToggle(!toggle)}/>}
            {!toggle&&<img className="icon" src={button_down} onClick={() => setToggle(!toggle)}/>}
            </div>
            {toggle&&(folder.map((fold) => {
              return <div className="eachItem" key={fold.id}>
                <div className="folder_name" >{fold.name} </div>
              <img className="icon" src={vector} />
              </div>;
            }))}
            <div>
            <button className="folderHead">
              Shared Routes
            </button> 
            </div>
            <div>
            <button className="folderHead">
              Like Routes
            </button>
            </div>
          </div>
          
          <div className="right">
            <div className="folders">
              {
            folder.map((fold) => {
              return <button onClick={onFolderClick} className="eachItem" key={fold.id}>
                {fold.name} 
              </button>;
            })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
