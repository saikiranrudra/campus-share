import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import UserLayout from "../../src/components/layout/UserLayout";
import {
  Paper,
  makeStyles,
  Typography,
  lighten,
  ButtonBase,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
} from "@material-ui/core";
import { userAuthCheck } from "./../../src/utils/userAuthCheck";
import campusShareAPI from "../../src/utils/Apis/campusShareAPI";
import Logger from "../../src/utils/Logger";
import ActivationForm from "./../../src/components/user/ActivationForm";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeContent: "center",
    height: "95vh",
  },
  profileContainer: {
    padding: "2rem 3rem",
    display: "grid",
    placeContent: "center",
    gridTemplateColumns: "1fr",
  },
  profileImage: {
    borderRadius: "10rem",
    height: "5rem",
    width: "5rem",
    boxShadow: theme.shadows[1],
  },
  headContent: {
    "& > p:first-child": {
      fontWeight: "bolder",
    },

    "& > p:last-child": {
      fontWeight: "lighter",
    },
  },
  profileImageContainer: {
    textAlign: "center",
  },
  isActive: {
    backgroundColor: lighten(theme.palette.primary.light, 0.5),
    color: theme.palette.primary.dark,
    display: "inline-block",
    textAlign: "center",
    padding: ".6rem",
    borderRadius: "5px",
    fontSize: ".8rem",
    textTransform: "uppercase",
    fontWeight: "bolder",
  },
  key: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

const Profile = ({ user }) => {
  const classes = useStyle();
  const [openActivationForm, setOpenActivationForm] = useState(false);
  const [showActivationRequest, setShowActivationRequest] = useState(false);

  useEffect(() => {
    campusShareAPI
      .get("/api/user/activationRequest", {
        params: {
          _id: user?._id,
        },
      })
      .then((res) => {
        setShowActivationRequest(!res.data.isRequestPlaced);
      })
      .catch((err) => {
        setShowActivationRequest(false);
        Logger.error(err);
      });
  }, []);

  //testing
  useEffect(() => {
    console.log(showActivationRequest);
  }, [showActivationRequest]);

  return (
    <>
      <Head>
        <title>Campus Share - Profile</title>
      </Head>
      <UserLayout route="/profile">
        <div className={classes.container}>
          <Paper className={classes.profileContainer}>
            <div className={classes.profileImageContainer}>
              <Image
                src={user?.avatar || "/avatar"}
                height="100"
                width="100"
                className={classes.profileImage}
              />
            </div>
            <div className={classes.headContent}>
              <Typography varaint="h3" align="center">
                {user?.fullName}
              </Typography>
              <Typography varaint="body1" align="center">
                {user?.email}
              </Typography>
            </div>

            <ButtonBase className={classes.isActive}>
              {user?.active ? "Activated" : "Not Activated"}
            </ButtonBase>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.key}>College Name</TableCell>
                  <TableCell>{user?.college?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.key}>Adhaar Id</TableCell>
                  <TableCell>{user?.adhaarNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.key}>
                    College Enrollment Number
                  </TableCell>
                  <TableCell>{user?.collegeEnrollmentNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.key}>upi</TableCell>
                  <TableCell>{user?.upi}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
            {!user?.active && showActivationRequest && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenActivationForm(true);
                }}
              >
                Request Account Activation
              </Button>
            )}
            <br />
            <Button color="primary">Change Password</Button>
          </Paper>
        </div>
        {user.email && user._id && (
          <Dialog
            open={openActivationForm}
            onClose={() => {
              setOpenActivationForm(false);
            }}
          >
            <ActivationForm
              email={user.email}
              setShowActivationRequest={setShowActivationRequest}
              showActivationRequest={showActivationRequest}
           />
          </Dialog>
        )}
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return await userAuthCheck(ctx);
};

export default Profile;
