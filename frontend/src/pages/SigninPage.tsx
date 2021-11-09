import React from "react";
import NavBar from "../components/NavBar";
import Signin from "../containers/Signin";
import backgroundImage from '../static/png/signin_page.png';

interface PropType {
  location: any
  match: any
  history: any
}

function SigninPage(props: PropType) {
  return (
    <>
      <img className="signin-background" src={backgroundImage} />
      <NavBar location={props.location} />
      <Signin />
    </>
  );
}

export default SigninPage;
