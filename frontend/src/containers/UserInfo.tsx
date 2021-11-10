import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "../styles/components/Userinfo.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useUserState } from "../hooks/useUserState";
import logo from "../static/profile.png";
// import { RootReducerType } from "../store/store";
import button_up from "../static/chevron-down.svg";
import button_down from "../static/chevron-up.svg";
import vector from "../static/Vector.svg";
import { editFolderAction } from "../store/User/userAction";

function UserInfo() {
  const dispatch = useDispatch();

  interface String {
    id: string;
  }
  const [toggle, setToggle] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [postImages, setImages] = useState([""]);
  const [sharedImages, setSharedImages] = useState([
    ''
  ]);
  const [likeImages, setLikeImages] = useState([""]);
  const [imageToShow, setImageToShow] = useState(1);
  // const { loggedUser } = useSelector((state: RootReducerType) => state.user);
  const loggedUser = useUserState();

  // const [folderEdited, setFolderEdited] = useState(0)
  // const [folderName, setFolderName] = useState("")

  const [isFolderEdited, setIsFolderEdited] = useState(false);
  const [folderInputs, setFolderInputs] = useState({
    folderId: 0,
    folderName: ""
  })

  const [userInfo, setUserInfo] = useState({
    profile_image: "",
    email: "",
    username: "",
  });
  const [folder, setFolderSelect] = useState([
    {
      id: 0,
      name: "",
      posts: [{ id: "", thumbnail_image: "" }],
    },
  ]);
  const onEditProfile = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isFolderEdited) {
      setFolderSelect(loggedUser.folders);
      setFolderInputs({ folderId: 0, folderName: "" });
    }
  }, [isFolderEdited])

  const { id } = useParams<String>();

  const onFolderClick = (folder_id: number) => {
    const images = [];
    for (let i = 0; i < folder.length; i++) {
      if (folder[i].id == folder_id) {
        for (let p = 0; p < folder[i].posts.length; p++) {
          images.push(folder[i].posts[p].thumbnail_image);
        }
        break;
      }
    }
    setImages(images);
    return images;
  };

  const onChangeEditFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFolderInputs({
      ...folderInputs,
      folderName: e.target.value
    })
  };

  const onClickEditFolder = (folder_id: number, folder_name: string) => {
    setFolderInputs({
      folderId: folder_id,
      folderName: folder_name
    })
  }

  const onEditFolder = (folder_id: number) => {
    dispatch(editFolderAction(
      loggedUser.id,
      folder_id,
      { folder_name: folderInputs.folderName },
      (value) => setIsFolderEdited(value))
    )
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
        })
        .catch((err) => err.response);
        
      axios
        .get(`/user/${id}/share/`)
        .then(function (response) {
          console.log(response.data)
          for(var i=0; i<response.data.length; i++){

          }
          setSharedImages(response.data)
        }
        )
        .catch((err) => err.response);
      axios
        .get(`/user/${id}/like/`)
        .then(function (response) {
          setLikeImages(response.data);
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
        <div className="image-wrapper">
          <div className="image">
            {userInfo.profile_image == null && (
              <img className="profileImage" src={logo} />
            )}
            {userInfo.profile_image != null && (
              <img className="profileImage" src={userInfo.profile_image} />
            )}
          </div>
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
            <div className="folderHead">
              Folders
              {toggle && (
                <img
                  className="icon"
                  src={button_up}
                  onClick={() => setToggle(!toggle)}
                />
              )}
              {!toggle && (
                <img
                  className="icon"
                  src={button_down}
                  onClick={() => setToggle(!toggle)}
                />
              )}
            </div>
            {toggle &&
              folder.map((fold) => {
                if (folderInputs.folderId === fold.id) {
                  return (
                    <div className="folder_input_container">
                      <input
                        id="edit_folder_input"
                        type="text"
                        value={folderInputs.folderName}
                        onChange={onChangeEditFolder}
                        placeholder="변경할 폴더 이름"
                      />
                      <img className="icon" src={vector} onClick={() => onEditFolder(fold.id)} />
                    </div>
                  )
                } else {
                  return (
                    <div className="eachItem" key={fold.id}>
                      <div
                        className="folder_name"
                        onClick={() => {
                          onFolderClick(fold.id);
                          setImageToShow(1);
                        }}
                      >
                        {fold.name}{" "}
                      </div>
                      <img className="icon" src={vector} onClick={() => onClickEditFolder(fold.id, fold.name)} />
                    </div>
                  );
                }
              })}
            <div className="left_button">
              <button onClick={() => setImageToShow(2)} className="folderHead">
                Like Routes
              </button>
            </div>
            <div className="left_button">
              <button onClick={() => setImageToShow(3)} className="folderHead">
                Shared Routes
              </button>
            </div>
          </div>

          <div className="right">
            <div className="route_image">
              {imageToShow == 1 &&
                postImages.map((image) => {
                  return (
                    <img
                      className="route_image"
                      key={postImages.indexOf(image)}
                      src={image}
                    />
                  );
                })}
              {imageToShow == 2 &&
                likeImages.map((image) => {
                  return (
                    <img
                      className="route_image"
                      key={likeImages.indexOf(image)}
                      src={image}
                    />
                  );
                })}
              {imageToShow == 3 &&
                sharedImages.map((image) => {
                  return (
                    <img
                      className="route_image"
                      key={sharedImages.indexOf(image)}
                      src={image}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
