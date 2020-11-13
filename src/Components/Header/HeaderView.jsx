import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link as RouterLink } from "react-router-dom";

class HeaderView extends React.Component {
  showEmailLoggedIn = () => {
    return this.props.loggedInTrue ? (
      <div className="currentUserEmail">Email</div>
    ) : (
      <div className="empty"></div>
    );
  };

  showLoginOrLogout = () => {
    return this.props.loggedInTrue ? (
      <Button
        color="inherit"
        className="buttonLogout"
        onClick={this.props.onLogout}
      >
        Logout
      </Button>
    ) : (
      <Button
        color="inherit"
        className="buttonLogin"
        component={RouterLink}
        to="/login"
      >
        Login
      </Button>
    );
  };
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={RouterLink} to="/">
            Go To Home
          </Typography>
          <Typography variant="h6">{this.showEmailLoggedIn()}</Typography>
          {this.showLoginOrLogout()}
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderView;
