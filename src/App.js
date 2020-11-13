import React from "react";
import AuthenticationView from "./Components/Authentication/AuthenticationView";
import HeaderView from "./Components/Header/HeaderView";
import PostView from "./Components/Post/PostView";
import { checkForToken } from "./Components/Authentication/authentication";

import { BrowserRouter, Route } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInTrue: null,
    };
  }
  userSetup = () => {};

  onLogin = () => {
    this.setState({ loggedInTrue: true });
  };

  onLogout = () => {
    this.setState({ loggedInTrue: false });
    localStorage.token = "";
  };

  componentDidMount = () => {
    this.setState({ loggedInTrue: checkForToken() });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-headerx">
            <HeaderView
              onLogout={this.onLogout}
              loggedInTrue={this.state.loggedInTrue}
            ></HeaderView>
          </header>
          <Route path="/" exact component={PostView}></Route>
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
