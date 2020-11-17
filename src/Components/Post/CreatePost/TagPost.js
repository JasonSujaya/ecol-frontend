import React from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ChipInput from "material-ui-chip-input";

class TagPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagData: [
        { key: 0, label: "Angular" },
        { key: 1, label: "jQuery" },
        { key: 2, label: "Polymer" },
        { key: 3, label: "React" },
        { key: 4, label: "Vue.js" },
      ],
    };
  }

  handleDelete = (tagToDelete) => {
    this.setState(() => ({
      tagData: this.state.tagData.filter((tag) => tag.key !== tagToDelete.key),
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <ChipInput
          //   defaultValue={["foo", "bar"]}
          dataSource={this.state.tagData}
          //   onAdd={(chip) => handleAddChip(chip)}
          onDelete={(data) => this.handleDelete(data)}
        />
        <form noValidate autoComplete="off" className="createPostContainer">
          <Paper component="ul">
            {this.state.tagData.map((data) => {
              return (
                <li key={data.key}>
                  <Chip
                    label={data.label}
                    onDelete={() => this.handleDelete(data)}
                  />
                </li>
              );
            })}
          </Paper>
        </form>
        >
      </Grid>
    );
  }
}

export default TagPost;
