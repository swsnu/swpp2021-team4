import React from "react";
import NavBar from "../components/NavBar";
import Signup from "../containers/Signup";
import "../styles/components/Signup.scss";
import backgroundImage from "../static/png/signup_page.png";
import Footer from "../components/Footer";

interface PropType {
  location: any;
  match: any;
  history: any;
}

function SignupPage(props: PropType) {
  return (
    <div>
      <img className="signup-background" src={backgroundImage} />
      <NavBar location={props.location} />
      <Signup />
      <Footer />
    </div>
  );
}

export default SignupPage;
