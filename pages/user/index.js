import { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import UserLayout from "../../src/components/layout/UserLayout";
import CreateDelivery from "../../src/components/delivery/CreateDelivery";

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UserLayout route={"/user/"}>
        <div style={{ textAlign: "right", margin: ".8rem 0" }}>
          <Button variant="contained" color="primary" onClick={() => { setOpen(true) }}>
            Create Delivery
          </Button>
        </div>
        <Typography variant="h1">Home Page</Typography>
      </UserLayout>
      <CreateDelivery open={open} setOpen={setOpen} />
    </>
  );
};

export default Home;
