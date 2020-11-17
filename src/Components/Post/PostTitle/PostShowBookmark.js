import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    maxWidth: "500px",
    backgroundColor: "grey",
  },
  title: {
    fontSize: 14,
  },
});

export default function PostShowBookmark() {
  const classes = useStyles();

  return (
    <Box ml="2rem">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5">
            <Box fontWeight="fontWeightBold">Bookmark later</Box>
          </Typography>
          <Typography color="textSecondary">
            Start saving stories by clicking the bookmark icon and you’ll find
            them all here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
