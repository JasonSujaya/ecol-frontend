import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PostShowBookmark from "./PostTitle/PostShowBookmark";
import { get_post_feed } from "./postview.js";
import PostTitle from "./PostTitle/PostTitleView";
import Createpost from "./CreatePost/CreatePostView";

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
    };
  }
  putPostInState = async () => {
    console.log("updated");
    let data = await get_post_feed().catch((err) =>
      console.log("Response body", err.response.data)
    );

    this.setState({ postList: data });
  };

  async componentDidMount() {
    this.putPostInState();
  }

  renderPost = () => {
    return this.state.postList.length == 0 ? (
      <div className="loading">"Loading"</div>
    ) : (
      this.state.postList.reverse().map((item, index) => {
        return (
          <PostTitle
            id={this.state.postList[index].id}
            data={this.state.postList[index]}
            key={this.state.postList[index].id}
          ></PostTitle>
        );
      })
    );
  };

  allowPost = () => {
    return this.props.loggedInTrue ? (
      <Createpost putPostInState={this.putPostInState}></Createpost>
    ) : (
      <div>HIII</div>
    );
  };

  render() {
    return (
      <div>
        {this.allowPost()}
        <Box mt="2rem">
          <Grid container spacing={1} direction="column">
            <Grid item container>
              <Grid item xs={1} sm={1} md={1}></Grid>
              <Grid item xs={12} sm={9} md={7} className="hi">
                <div className="rendered"> {this.renderPost()}</div>
              </Grid>
              <Grid item xs={1} sm={1} md={3}>
                <PostShowBookmark></PostShowBookmark>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default PostView;
