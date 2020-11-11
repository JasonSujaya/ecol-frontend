import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { login, formsNotEmpty } from "./authentication.js";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      validForm: false,
    };
  }

  onSubmitLogin = async (e) => {
    e.preventDefault();
    // let result = await login(this.state.email, this.state.password);
    let result = login(this.state.email, this.state.password);
    result
      .then((response) => {
        this.setState({ email: "", password: "" });
        console.log("Called with good");
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log("Called with error");
      });
  };

  onErrorDisplayMessage = () => {
    if (this.state.error) {
      return (
        <div className="loginError">
          Username and password do not match or you do not have an account yet
        </div>
      );
    }
  };

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <form noValidate autoComplete="off">
          <div>
            <TextField
              required
              id="standard-required"
              label="email"
              className="emailInput"
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                  validForm: formsNotEmpty(e.target.value, this.state.password),
                })
              }
              value={this.state.email}
            />
            <TextField
              required
              id="standard-password-input"
              label="password"
              type="password"
              className="passwordInput"
              onChange={(e) =>
                this.setState({
                  password: e.target.value,
                  validForm: formsNotEmpty(this.state.email, e.target.value),
                })
              }
              value={this.state.password}
            />
            <Button
              disabled={!this.state.validForm}
              variant="contained"
              onClick={this.onSubmitLogin}
              className="signInButton"
            >
              Sign In
            </Button>
          </div>
        </form>
        {this.onErrorDisplayMessage()}
      </Grid>
    );
  }
}

export default LoginForm;
