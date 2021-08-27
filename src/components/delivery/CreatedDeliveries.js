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
                    <IconButton color="primary">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      { selectedDeliverie &&
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
      }
    </>
  );
};

export default CreatedDeliveries;
