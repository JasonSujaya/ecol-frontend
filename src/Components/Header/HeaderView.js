import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import "./HeaderView.css";
import { Link as RouterLink } from "react-router-dom";

class HeaderView extends React.Component {
  showEmailLoggedIn = () => {
    if (this.props.user != null && this.props.loggedInTrue != false) {
      return <div className="currentUserEmail">{this.props.user.email}</div>;
    }
  };

  showLoginOrLogout = () => {
    return this.props.loggedInTrue ? (
      <Button
        color="inherit"
        className="buttonLogout"
        onClick={this.props.onLogout}
        style={{ textTransform: "none" }}
      >
        <Typography variant="h6">Logout</Typography>
      </Button>
    ) : (
      <Button
        color="inherit"
        className="buttonLogin"
        component={RouterLink}
        to="/login"
        style={{ textTransform: "none" }}
      >
        <Typography variant="h6">Login</Typography>
      </Button>
    );
  };
  render() {
    return (
      <AppBar position="static" color="transparent" className="headContainer">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography
            id="goHomeLink"
            variant="h6"
            component={RouterLink}
            to="/"
          >
            Home
          </Typography>
          <Typography variant="h6">{this.showEmailLoggedIn()}</Typography>
          {this.showLoginOrLogout()}
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderView;
