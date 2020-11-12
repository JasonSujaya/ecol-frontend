import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Button from "@material-ui/core/Button";

class AuthenticationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: "SignUp" };
  }
  showAuthDisplay = () => {
    if (this.state.display == "LogIn") {
      return (
        <div>
          <LoginForm></LoginForm>
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
          <SignUpForm></SignUpForm>
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

  render() {
    return <div>{this.showAuthDisplay()}</div>;
  }
}

export default AuthenticationView;
