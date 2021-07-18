import { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import UserLayout from "../../src/components/layout/UserLayout";
import CreateDelivery from "../../src/components/delivery/CreateDelivery";
import { userAuthCheck } from "./../../src/utils/userAuthCheck";
import Card from "../../src/components/utils/Card";

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
          <Card title="Created Deliveries">
            <Typography variant="body">
              this is the content of the card which is written here, and now i
              am just typing some random text which dosnt make any sensen just
              wrote to fill the card with some text
            </Typography>
          </Card>
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
