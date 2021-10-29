import { Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  container: {
    padding: ".8rem 1rem",
    height: "100%"
  },
  list: {
    overflowY: "scroll",
    height: "85%",
  },
});

const Card = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Typography variant="h6" component="h2" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.list}>{children}</div>
    </Paper>
  );
};

Card.defaultProps = {
  title: "No Title",
};

export default Card;
