import React from "react";
import AuthenticationView from "./Components/Authentication/AuthenticationView";
import HeaderView from "./Components/Header/HeaderView";
import PostView from "./Components/Post/PostView.jsx";
import {
  checkForToken,
  getUser,
} from "./Components/Authentication/authentication";

import { BrowserRouter, Route } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInTrue: false,
      userData: {},
    };
  }
  userSetup = () => {};

  storeUserState = async () => {
    let data = await getUser(localStorage.id).catch((err) =>
      console.log("Response body", err.response.data)
    );
    this.setState({ userData: data });
  };

  onLogin = (getData) => {
    this.setState({ loggedInTrue: true, userData: getData });
    this.storeUserState(getData.id);
  };

  onLogout = () => {
    this.setState({ loggedInTrue: false });
    localStorage.token = "";
  };

  async componentDidMount() {
    this.setState({ loggedInTrue: checkForToken() }, () => {
      if (this.state.loggedInTrue) {
        this.storeUserState();
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-headerx">
            <HeaderView
              onLogout={this.onLogout}
              loggedInTrue={this.state.loggedInTrue}
              user={this.state.userData}
            ></HeaderView>
          </header>
          <Route
            path="/"
            exact
            component={() => (
              <PostView loggedInTrue={this.state.loggedInTrue} />
            )}
          ></Route>
          <Route
            path="/login"
            exact
            component={() => <AuthenticationView onLogin={this.onLogin} />}
          ></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default LoginForm;
