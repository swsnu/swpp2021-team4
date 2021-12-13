import React from "react";
import logo from "../static/profile.png";
import "../styles/components/BasicUserInfo.css";

interface PropType {
    loggedUserId: number;
    id: number;
    email: string;
    username: string;
    profile_image?: string;
    onEditProfile?: () => void;
}

function BasicUserInfo(props: PropType) {
    return (
        <div className="basic-user-info">
            <div className="image">
                {!props.profile_image && (
                    <img className="profileImage" src={logo} />
                )}
                {props.profile_image && (
                    <img className="profileImage" src={props.profile_image} />
                )}
            </div>
            <div className="basicInfo">
                <div className="email">
                    <div className="field">E-mail</div>
                    <div className="value">{props.email}</div>
                </div>
                <div className="line"></div>
                <div className="name">
                    <div className="field">username</div>
                    <div className="value">{props.username}</div>
                </div>
                <div className="line"></div>
                {props.loggedUserId === props.id && (
                    <button className="edit-btn" onClick={props.onEditProfile}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default BasicUserInfo;
