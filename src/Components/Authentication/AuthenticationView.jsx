import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

class AuthenticationView extends React.Component {
  render() {
    return (
      <div>
        <LoginForm></LoginForm>
        <SignUpForm></SignUpForm>
      </div>
    );
  }
}

export default AuthenticationView;
