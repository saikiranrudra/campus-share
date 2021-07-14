import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import AsyncSelect from "react-select/async";
import FileDropZone from "../utils/FileDropZone";

const useStyles = makeStyles({
  inputEle: {
    margin: ".4rem 0",
  },
});

const CreateDelivery = ({ open, setOpen }) => {
  const classes = useStyles();
  return (
    <Dialog open={open}>
      <DialogTitle>Create Delivery</DialogTitle>
      <DialogContent>
        <FormControl>
          <TextField
            placeholder="Title"
            type="text"
            name="title"
            variant="outlined"
            className={classes.inputEle}
          />
          <TextField
            placeholder="Description"
            type="text"
            name="description"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <Typography variant="h6">Destination</Typography>
          <TextField
            placeholder="Destination latitude"
            type="number"
            name="destinationLatitude"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <TextField
            placeholder="Destination longitude"
            type="number"
            name="destinationLongitude"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <TextField
            placeholder="Destination Address"
            type="text"
            name="destinationAddress"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <Typography variant="h6">Pickup</Typography>
          <TextField
            placeholder="pickup latitude"
            type="number"
            name="pickupLatitude"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <TextField
            placeholder="pickup longitude"
            type="number"
            name="pickupLongitude"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <TextField
            placeholder="pickup Address"
            type="text"
            name="pickupAddress"
            multiline
            variant="outlined"
            className={classes.inputEle}
          />
          <div className={classes.inputEle}>
            <AsyncSelect placeholder="Reciver Email" />
          </div>
          <FileDropZone maxFiles={1}>
            <span>Drop or click to upload your Item Picture</span>
          </FileDropZone>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Create Delivery
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDelivery;
