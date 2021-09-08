import { Button, Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "6fr 2fr 1fr 1fr",
    gap: ".1rem",
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: theme.palette.grey[600],
    padding: ".8rem",
    margin: ".5rem 0",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  content: {
    fontSize: ".9rem",
    fontWeight: "lighter",
  },
}));

const DeliveryCard = ({ delivery }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <div>
        <Typography variant="h4" className={classes.title}>
          {delivery.title}
        </Typography>
        <Typography variant="body1" className={classes.content}>
          {delivery.description}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" className={classes.title}>
          Delivery Location
        </Typography>
        <Typography variant="body1" className={classes.content}>
          {delivery.dipartureAddress}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" className={classes.title}>
          Amount
        </Typography>
        <Typography variant="body1" className={classes.content}>
          1.50₹
        </Typography>
      </div>
      <Button
        color="primary"
        variant="contained"
        style={{ alignSelf: "center" }}
      >
        Accept
      </Button>
    </Paper>
  );
};

export default DeliveryCard;
