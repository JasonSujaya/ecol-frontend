import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

class PostAction extends React.Component {
  render() {
    return (
      <Grid container>
        {/* <Typography> {this.props.data.created_date.slice(0, 10)}</Typography> */}
        {/* <Typography>{this.props.data.content.length} minute read</Typography> */}
        <BookmarkBorderIcon></BookmarkBorderIcon>
      </Grid>
    );
  }
}

export default PostAction;
