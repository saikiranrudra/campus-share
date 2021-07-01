import { Paper, makeStyles, IconButton } from "@material-ui/core";
import Logo from "../utils/Logo";

//Icons
import {
  Home as HomeIcon,
  AccountBox as AccountIcon,
  Settings as SettingsIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    margin: "1rem 0",
    padding: "1.5rem 0",
    height: "95vh",
    position: "sticky",
  },

  icons: {
    marginTop: "2.1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
}));

const SideNav = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Logo withName={false} />

      <div className={classes.icons}>
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton>
          <AccountIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default SideNav;
