import { useState, useEffect, useCallback } from "react";
import { makeStyles, Button } from "@material-ui/core";
import UserLayout from "../../src/components/layout/UserLayout";
import CreateDelivery from "../../src/components/delivery/CreateDelivery";
import { userAuthCheck } from "./../../src/utils/userAuthCheck";
import CreatedDeliveries from "../../src/components/delivery/CreatedDeliveries";
import AllDeliveries from "../../src/components/delivery/AllDeliveries";
import campusShareAPI from "../../src/utils/Apis/campusShareAPI";
import Logger from "../../src/utils/Logger";
import Response from "./../../src/components/utils/Response";

/**
 * TODOS
 * 1. Create Error popups for fetching all deliveris
 * 2. Work on Accept Functionality
 */

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "7fr 9fr",
    gap: ".3rem",
  },
});

const Home = ({ user, keyId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  const getAllDeliveris = useCallback(() => {
    campusShareAPI
      .get("/api/delivery", {
        params: {
          status: "paid",
        },
      })
      .then((res) => {
        setDeliveries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        Logger.error(err);
      });
  }, []);

  useEffect(() => {
    getAllDeliveris();
  }, []);

  return (
    <>
      <UserLayout route={"/user/"}>
        <div style={{ textAlign: "right", margin: ".8rem 0" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Create Delivery
          </Button>
        </div>
        <div className={classes.container}>
          <CreatedDeliveries user={user} keyId={keyId} />
          <AllDeliveries deliveries={deliveries} getAllDeliveris={getAllDeliveris} user={user} />
        </div>
      </UserLayout>
      <CreateDelivery open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return await userAuthCheck(ctx, {
    keyId: process.env.PAYMENT_KEY_ID,
  });
};

export default Home;
