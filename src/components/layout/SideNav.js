import { useRouter } from 'next/router'
import { Paper, makeStyles, IconButton } from "@material-ui/core";
import Logo from "../utils/Logo";
import campusShareAPI from "./../../utils/Apis/campusShareAPI"

//Icons
import {
  Home as HomeIcon,
  AccountBox as AccountIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon
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
    justifyContent: "center"
  },
}));

const SideNav = ({ route }) => {
  const classes = useStyles();
  const router = useRouter();
  const handleSignout = () => {
    campusShareAPI.post('/api/auth/signout').then(() => {
      router.push('/auth/signin');
    })
  }

  return (
    <Paper className={classes.container}>
      <Logo withName={false} />

      <div className={classes.icons}>
        <IconButton color={route === "/home" ? "secondary" : "default"} >
          <HomeIcon />
        </IconButton>
        <IconButton color={route === "/profile" ? "secondary" : "default"}>
          <AccountIcon />
        </IconButton>
        <IconButton color={route === "/setting" ? "secondary" : "default"}>
          <SettingsIcon />
        </IconButton>
        <IconButton color={route === "/signout" ? "secondary" : "default"} onClick={handleSignout}>
          <SignOutIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default SideNav;
