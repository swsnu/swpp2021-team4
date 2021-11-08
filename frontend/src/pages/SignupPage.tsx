import React from "react";
import NavBar from "../components/NavBar";
import Signup from "../containers/SIgnup";

interface PropType {
  location: any
  match: any
  history: any
}

function SignupPage(props: PropType) {
  return (
    <>
      <NavBar location={props.location} />
      <Signup />
    </>
  );
}

export default SignupPage;
