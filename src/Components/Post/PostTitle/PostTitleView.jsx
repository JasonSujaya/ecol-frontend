import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import imagess from "./image.jpeg";
import PostAction from "./PostAction";
import Button from "@material-ui/core/Button";

class PostTitle extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div className="postTitleBox">
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="subtitle1">Businesse</Typography>
              <Typography gutterBottom variant="h5">
                <Box
                  lineHeight="normal"
                  fontWeight="fontWeightBold"
                  className="postTitle"
                >
                  {this.props.data.title}
                </Box>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {this.props.data.content}
              </Typography>
              <PostAction></PostAction>
            </Grid>
            <Grid item xs={4}>
              <CardMedia image={imagess} title="title_stuff" />
            </Grid>
          </Grid>
        </CardContent>
      </div>
    );
  }
}

export default PostTitle;
