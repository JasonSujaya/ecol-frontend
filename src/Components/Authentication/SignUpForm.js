import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import "./authentication.css";

import {
  signUp,
  login,
  inputNotEmpty,
  checkPassword,
} from "./authentication.js";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      validForm: false,
      invalidPassword: false,
      invalidPasswordMessage: "",
      error: false,
      signUpSuccessfull: false,
    };
  }

  onSignUp = async (e) => {
    e.preventDefault();
    this.setState({
      invalidPassword: true,
      invalidPasswordMessage: checkPassword(this.state.password),
    });

    if (checkPassword(this.state.password) == true) {
      let result = signUp(
        this.state.email,
        this.state.first_name,
        this.state.last_name,
        this.state.password
      );
      result
        .then((response) => {
          let result = login(this.state.email, this.state.password);
          result.then((response) => {
            this.props.onSuccess(response.data);
            this.setState({
              email: "",
              first_name: "",
              last_name: "",
              password: "",
            });
          });
        })
        .catch((error) => {
          this.setState({ error: true });
        });
    } else {
      this.setState({
        invalidPassword: true,
        invalidPasswordMessage: checkPassword(this.state.password),
      });
    }
  };

  checkValidForm = (e) => {
    let validity =
      inputNotEmpty(this.state.email) &&
      inputNotEmpty(this.state.password) &&
      inputNotEmpty(this.state.first_name) &&
      inputNotEmpty(this.state.last_name);
    this.setState({ validForm: validity });
  };

  onErrorDisplayMessage = () => {
    if (this.state.error) {
      return (
        <div className="signUpError">You have an existing account already!</div>
      );
    }
  };

  invalidPasswordDisplayMessage = () => {
    if (this.state.invalidPasswordMessage) {
      return (
        <div className="invalidPasswordError">
          {this.state.invalidPasswordMessage}
        </div>
      );
    }
  };

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <form noValidate autoComplete="off">
          <div className="formContainer">
            <TextField
              required
              className="emailInput"
              id="standard-required"
              label="email"
              onChange={(e) =>
                this.setState(
                  {
                    email: e.target.value,
                  },
                  () => this.checkValidForm()
                )
              }
              value={this.state.email}
            />
            <TextField
              id="standard-password-input"
              className="passwordInput"
              label="password"
              type="password"
              required
              onChange={(e) =>
                this.setState(
                  {
                    password: e.target.value,
                  },
                  () => this.checkValidForm()
                )
              }
              value={this.state.password}
            />
            <TextField
              required
              id="standard-required"
              className="firstNameInput"
              label="Your First Name"
              onChange={(e) =>
                this.setState(
                  {
                    first_name: e.target.value,
                  },
                  () => this.checkValidForm()
                )
              }
              value={this.state.first_name}
            />
            <TextField
              required
              id="standard-required"
              label="Your Last Name"
              className="lastNameInput"
              onChange={(e) =>
                this.setState(
                  {
                    last_name: e.target.value,
                  },
                  () => this.checkValidForm()
                )
              }
              value={this.state.last_name}
            />
            <Button
              variant="contained"
              onClick={this.onSignUp}
              disabled={!this.state.validForm}
              className="signUpButton"
            >
              Sign Up
            </Button>
          </div>
        </form>
        {this.onErrorDisplayMessage()}
        {this.invalidPasswordDisplayMessage()}
      </Grid>
    );
  }
}

export default SignUpForm;
