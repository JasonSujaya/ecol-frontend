import React from "react";
import AuthenticationView from "./Components/Authentication/AuthenticationView";

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <AuthenticationView></AuthenticationView>
      </div>
    );
  }
}

export default LoginForm;
