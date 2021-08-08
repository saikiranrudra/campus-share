import { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import UserLayout from "../../src/components/layout/UserLayout";
import CreateDelivery from "../../src/components/delivery/CreateDelivery";
import { userAuthCheck } from "./../../src/utils/userAuthCheck";
import Card from "../../src/components/utils/Card";
import CreatedDeliveries from "../../src/components/delivery/CreatedDeliveries";

const Home = ({ user }) => {
  const [open, setOpen] = useState(false);
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
        <div>
          <CreatedDeliveries user={user} />
        </div>
      </UserLayout>
      <CreateDelivery open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return await userAuthCheck(ctx);
};

export default Home;
