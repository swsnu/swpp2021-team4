import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Signin from "../containers/Signin";

interface PropType {
  location: any
  match: any
  history: any
}

function SigninPage(props: PropType) {
  return (
    <>
      <img className="signin-background" src={"https://tripick.s3.ap-northeast-2.amazonaws.com/signin_page.png"} />
      <NavBar location={props.location} />
      <Signin />
      <Footer />
    </>
  );
}

export default SigninPage;
