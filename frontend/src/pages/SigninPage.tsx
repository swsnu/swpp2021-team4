import React from "react";
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
      <NavBar location={props.location} />
      <Signin />
    </>
  );
}

export default SigninPage;
