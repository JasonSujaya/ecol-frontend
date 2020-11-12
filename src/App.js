import React from "react";
import AuthenticationView from "./Components/Authentication/AuthenticationView";
import HeaderView from "./Components/Header/HeaderView";
import PostView from "./Components/Post/PostView";

import { BrowserRouter, Route } from "react-router-dom";

class LoginForm extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-headerx">
            <HeaderView></HeaderView>
          </header>
          <Route path="/" exact component={PostView}></Route>
          <Route path="/login" exact component={AuthenticationView}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default LoginForm;
