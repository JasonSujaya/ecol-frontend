import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import imagess from "./image.jpeg";
import PostAction from "./PostAction";
import { getUser } from "../../Authentication/authentication";
import { getCategoryName } from "../postview.js";

class PostTitle extends React.Component {
  state = {
    loading: true,
  };

  // getUserFirstName = async (id) => {
  //   let data = await getUser(id).catch((err) =>
  //     console.log("Response body", err.response.data)
  //   );
  //   console.log(data.first_name);
  //   return "hi";
  //   // return data.first_name;
  // };

  render() {
    return (
      <div className="postTitleBox">
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              {/* <Typography variant="subtitle2">
                {this.props.data.user}
              </Typography> */}

              <Typography variant="subtitle1">
                {getCategoryName(this.props.data.category)}
              </Typography>
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
              <PostAction data={this.props.data}></PostAction>
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
