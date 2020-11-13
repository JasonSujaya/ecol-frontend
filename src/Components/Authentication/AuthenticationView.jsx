import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Button from "@material-ui/core/Button";
import { storeTokenId } from "./authentication.js";
import { withRouter } from "react-router";

class AuthenticationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: "LogIn" };
  }

  showAuthDisplay = () => {
    if (this.state.display == "LogIn") {
      return (
        <div>
          <LoginForm
            id="loginForm"
            onSuccess={this.onSuccesfullAuthentication}
          ></LoginForm>
          <div>
            Don't have an account yet?
            <Button
              onClick={() => {
                this.changeDisplay("SignUp");
              }}
            >
              SignUp
            </Button>
          </div>
        </div>
      );
    } else if (this.state.display == "SignUp") {
      return (
        <div>
          <SignUpForm
            id="signUpForm"
            onSuccess={this.onSuccesfullAuthentication}
          ></SignUpForm>
          <div>
            Already registered?
            <Button
              onClick={() => {
                this.changeDisplay("LogIn");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      );
    }
  };

  changeDisplay = (type) => {
    this.setState({ display: type });
  };

  onSuccesfullAuthentication = (getData) => {
    console.log(getData);
    console.log("Triggered");

    storeTokenId(getData);

    this.props.onLogin(getData);
    this.props.history.push("/");
  };

  render() {
    return <div>{this.showAuthDisplay()}</div>;
  }
}

export default withRouter(AuthenticationView);
