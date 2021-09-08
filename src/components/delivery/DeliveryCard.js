import { useState } from "react";
import { Button, Paper, Typography, makeStyles } from "@material-ui/core";
import campusShareAPI from "../../utils/Apis/campusShareAPI";
import Response from "../utils/Response";
import Logger from "../../utils/Logger";

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

const DeliveryCard = ({ delivery, user, getAllDeliveris }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({
    message: "Delivery Assigned Successfully",
    type: "success",
    isLoading: false,
  });

  const handleAccept = () => {
    setResponse({ ...response, isLoading: true });
    campusShareAPI
      .put("/api/delivery", {
        ...delivery,
        deliveryPerson: user._id,
        status: "assigned",
      })
      .then((res) => {
        getAllDeliveris();
        setResponse({
          message: "✔ Delivery Assigned Successfully",
          type: "success",
          isLoading: false,
        });
      })
      .catch((err) => {
        Logger.error(err);
        console.log(err);
        setResponse({
          message: "❌ Something went wrong try again later",
          type: "error",
          isLoading: false,
        });
      });
  };

  return (
    <>
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
          onClick={handleAccept}
          disabled={response.isLoading}
        >
          Accept
        </Button>
      </Paper>
      <Response open={open} setOpen={setOpen} response={response} />
    </>
  );
};

export default DeliveryCard;
