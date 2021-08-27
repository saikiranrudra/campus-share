import { useEffect, useState, useCallback } from "react";
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  lighten,
  IconButton,
  Button,
} from "@material-ui/core";
import CreateDelivery from "./CreateDelivery";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import campusShareAPI from "../../utils/Apis/campusShareAPI";
import Card from "../utils/Card";
import Response from "../utils/Response";
import Logger from "../../utils/Logger";

const useStyle = makeStyles({
  title: {
    textTransform: "uppercase",
    fontWeight: "bolder",
  },
  badge: {
    padding: ".5rem .8rem",
    fontWeight: "bolder",
    borderRadius: "1rem",
  },
});

const CreatedDeliveries = ({ user }) => {
  const classes = useStyle();
  const [deliveries, setDeliveries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeliverie, setSelectedDeliverie] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    type: "success",
    message: "Delivery Deleted Successfully",
    isLoading: false
  });

  const fetchDeliveries = useCallback(() => {
    campusShareAPI
      .get("/api/delivery", {
        params: {
          owner: user._id,
        },
      })
      .then((res) => {
        setDeliveries(res.data.data);
      });
  }, [user, setDeliveries]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleDelete = useCallback((deliverie) => {
    setMessage({ ...message, isLoading: true })
    campusShareAPI.delete("/api/delivery", { params: { _id: deliverie._id } })
    .then(() => {
        setMessage({ type: "success", message: "Delivery Deleted Successfully", isLoading: false })
        setOpen(true);
        fetchDeliveries();
      }).catch(err => {
        setMessage({ type: "error", message: "Something went wrong!", isLoading: false })
        Logger.error(err);
        setOpen(true);
      });
    },
    []);

  const colors = {
    unassigned: "#eb3b5a",
    assigned: "#3867d6",
    dispached: "#f7b731",
    recived: "#10ac84",
    unpaid: "#341f97",
  };

  return (
    <>
      <Card title="Created Deliveries">
        <Table>
          <TableHead>
            <TableRow className={classes.title}>
              <TableCell>Delivery Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((deliverie) => (
              <TableRow key={deliverie._id}>
                <TableCell>{deliverie._id}</TableCell>
                <TableCell>{deliverie.title}</TableCell>
                <TableCell>
                  <span
                    className={classes.badge}
                    style={{
                      color: colors[deliverie.status],
                      backgroundColor: lighten(colors[deliverie.status], 0.5),
                    }}
                  >
                    {deliverie.status}
                  </span>
                </TableCell>
                <TableCell>
                  {deliverie.status === "unpaid" && (
                    <Button variant="contained" size="small" color="primary">
                      Pay Now
                    </Button>
                  )}
                  {deliverie.status !== "assigned" && (
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedDeliverie(deliverie);
                        setOpenDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}

                  {deliverie.status !== "assigned" && (
                    <IconButton
                      color="primary"
                      disabled={message.isLoading}
                      onClick={() => {
                        handleDelete(deliverie);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {selectedDeliverie && (
        <CreateDelivery
          user={user}
          open={openDialog}
          setOpen={setOpenDialog}
          title={"Edit Delivery"}
          initialValues={selectedDeliverie}
          btnText="Save Changes"
          ctype="UPDATE"
          callback={fetchDeliveries}
        />
      )}
      <Response open={open} setOpen={setOpen} response={message} />
    </>
  );
};

export default CreatedDeliveries;
