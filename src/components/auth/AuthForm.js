import { useState } from "react"
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Nav from "./../layout/Nav";
import { Button, Typography, Snackbar } from "@material-ui/core";
import SignupForm from "./SignupForm";
import { makeStyles } from "@material-ui/core/styles";
import SigninForm from "./SignInForm";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      margin: "0 1rem",
    },
  },
  heroText: {
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.4rem",
    },
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
}));

/**
 * Authentication form for creating account and signing In
 * @category auth
 * @subCategory Desktop
 * @param {object} props
 * @param {string} props.header -- text shown in the tab area
 * @param {('SIGN_IN'|'SIGN_UP')} props.type -- type of the auth form
 *
 * @component
 * @example
 * <AuthForm type="SIGN_IN" header="🔐 Login Form" />
 */

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AuthForm = ({ header, type }) => {
  const classes = useStyles();
  const [btnState, setBtnState] = useState({
    isLoading: false,
    message: "",
    type: "success",
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };

  return (
    <>
      <Head>
        <title>{header}</title>
      </Head>
      <Nav>
        {type === "SIGN_UP" ? (
          <Link href="/auth/signin">
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        ) : (
          <Link href="/auth/signup">
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </Link>
        )}
      </Nav>

      <section
        className={classes.container}
        style={{ height: type === "SIGN_IN" ? "calc(100vh - 115px)" : null }}
      >
        <Image
          src="/auth-illustration.svg"
          alt="Authentication Illustration"
          height="500px"
          width="500px"
          style={{ alignSelf: "center", justifySelf: "center" }}
        />
        <div
          style={{
            alignSelf: type === "SIGN_IN" ? "center" : null,
          }}
        >
          <Typography variant="h2" component="h1" className={classes.heroText}>
            Welcome to{" "}
            <span className={classes.primaryColor}>Campus Share</span>
          </Typography>
          <Typography variant="body1">Authenticate Yourself</Typography>

          {type === "SIGN_UP" ? (
            <SignupForm
              setBtnState={setBtnState}
              btnState={btnState}
              setShowNotification={setShowNotification}
            />
          ) : (
            <SigninForm
              setBtnState={setBtnState}
              btnState={btnState}
              setShowNotification={setShowNotification}
            />
          )}
        </div>
        <Snackbar
          open={showNotification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
        >
          <Alert onClose={handleCloseNotification} severity={btnState.type}>
            {btnState.message}
          </Alert>
        </Snackbar>
      </section>
    </>
  );
};

AuthForm.prototype = {
  /**
   * text shown in the top tab of the browser
   */
  header: PropTypes.string.isRequired,
  /**
   * Type of the form weather for creating account or login in
   */
  type: PropTypes.oneOf(["SIGN_IN", "SIGN_UP"]).isRequired,
};

AuthForm.defaultProps = {
  header: "Create an Account",
  type: "SIGN_IN",
};

export default AuthForm;
