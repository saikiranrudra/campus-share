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
  TableCell
} from "@material-ui/core";
import { userAuthCheck } from "./../../src/utils/userAuthCheck";
import Logger from "../../src/utils/Logger";

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
    color: "#000",
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
    fontWeight: "bolder"
  },
  profileTable: {
    "& > tbody > tr > td": {
      color: "#000"
    }
  }
}));

const Profile = ({ user }) => {
  const classes = useStyle();
  Logger.log(user);
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

            <Table className={classes.profileTable}>
              <TableBody>
                <TableRow>
                  <TableCell>College Name</TableCell>
                  <TableCell>{user?.college?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Adhaar Id</TableCell>
                  <TableCell>{user?.adhaarNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>College Enrollment Number</TableCell>
                  <TableCell>{user?.collegeEnrollmentNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>upi</TableCell>
                  <TableCell>{user?.upi}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return await userAuthCheck(ctx);
};

export default Profile;
