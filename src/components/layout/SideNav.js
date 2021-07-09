import { useRouter } from "next/router";
import { Paper, makeStyles, IconButton } from "@material-ui/core";
import Logo from "../utils/Logo";
import campusShareAPI from "./../../utils/Apis/campusShareAPI";

//Icons
import {
  Home as HomeIcon,
  AccountBox as AccountIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    margin: "1rem 0",
    padding: "1.5rem 0",
    height: "90vh",
    position: "sticky",
  },

  icons: {
    marginTop: "2.1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const SideNav = ({ route }) => {
  const classes = useStyles();
  const router = useRouter();
  const handleSignout = () => {
    campusShareAPI.post("/api/auth/signout").then(() => {
      router.push("/auth/signin");
    });
  };

  return (
    <Paper className={classes.container}>
      <a href="/user/profile">
        <Logo withName={false} />
      </a>

      <div className={classes.icons}>
        <IconButton>
          <HomeIcon
            style={{
              fill: route === "/home" ? "#000" : "default",
            }}
          />
        </IconButton>
        <IconButton>
          <AccountIcon
            style={{
              fill: route === "/profile" ? "#000" : "default",
            }}
          />
        </IconButton>
        <IconButton>
          <SettingsIcon
            style={{
              fill: route === "/settings" ? "#000" : "default",
            }}
          />
        </IconButton>
        <IconButton onClick={handleSignout}>
          <SignOutIcon
            style={{
              fill: route === "/signout" ? "#000" : "default",
            }}
          />
        </IconButton>
      </div>
    </Paper>
  );
};

export default SideNav;
