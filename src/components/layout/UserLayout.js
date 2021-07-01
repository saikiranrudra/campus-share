import SideNav from "./SideNav";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "70px 1fr",
    gridGap: ".3rem",
    margin: "0 .8rem",
  },
});

/**
 * Every User Page should be wrapped inside UserLayout
 * @param { children } props
 */

const UserLayout = ({ children, route }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <SideNav route={route}  />
      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
