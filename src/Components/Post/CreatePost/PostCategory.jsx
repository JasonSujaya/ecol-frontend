import React from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import axios from "axios";
import { get_category } from "../postview.js";

class PostCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }
  handleChange = (e) => {
    this.props.onChange(e.target.value);
  };

  async componentDidMount() {
    get_category()
      .then((res) => {
        this.setState({ category: res.data });
      })
      .catch((err) => console.log("Response body", err.response.data));
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Select
          style={{ width: "200px" }}
          value={this.props.category}
          onChange={this.handleChange}
        >
          {this.state.category.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.category_name}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    );
  }
}

export default PostCategory;
