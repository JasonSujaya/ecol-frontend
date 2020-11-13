import React from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { create } from "./Create.js";
import "./CreatePost.css";
import PostCategory from "./PostCategory";
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      category: 0,
    };
  }
  onCategoryChange = (category_id) => {
    this.setState({ category: category_id });
  };

  onSubmitPost = (e) => {
    // e.preventDefault();
    create(this.state.title, this.state.content, this.state.category);
    this.setState({ title: "", content: "", category: 0 });
  };

  handleDelete = (tagToDelete) => {
    this.setState(() => ({
      tagData: this.state.tagData.filter((tag) => tag.key !== tagToDelete.key),
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <form noValidate autoComplete="off" className="createPostContainer">
          <PostCategory
            onChange={this.onCategoryChange}
            category={this.state.category}
          ></PostCategory>
          <TextField
            required
            id="standard-required"
            label="title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          />
        </form>
        <Button variant="contained" onClick={this.onSubmitPost}>
          Post
        </Button>
      </Grid>
    );
  }
}

export default CreatePost;
