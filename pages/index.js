import Image from "next/image";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, Typography } from "@material-ui/core";
import Logo from "../src/components/Logo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    minHeight: "calc(100vh - (43px + 2rem))",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  heroText: {
    fontWeight: "bolder",
    fontSize: "4.5rem",
    textTransform: "uppercase",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.9rem",
      textAlign: "center",
    },
  },
  heroCaption: {
    fontWeight: "lighter",
    fontSize: "1rem",
    letterSpacing: ".4rem",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },

  heroContent: {
    display: "grid",
    placeContent: "center",
  },
  heroBtnGroup: {
    margin: "2.1rem 0",
    "& > button:not(:first-child)": {
      marginLeft: "1.5rem",
    },
    [theme.breakpoints.down("md")]: {
      margin: "2.1rem auto",
      "& > button:not(:first-child)": {
        marginLeft: "1rem",
      },
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "& > button:not(:first-child)": {
        marginLeft: "0",
        marginTop: ".5rem",
      },
    },
  },
  heroImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30% 70% 70% 30% / 35% 26% 74% 65%",
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <>
      <nav style={{ margin: "1rem" }}>
        <Logo appName={process.env.appName} />
      </nav>
      <header className={classes.heroContainer}>
        <div className={classes.heroContent}>
          <Typography variant="h1" component="h1" className={classes.heroText}>
            Campus Share
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.heroCaption}
          >
            An Inter Campus Delivery Service
          </Typography>
          <div className={classes.heroBtnGroup}>
            <Button variant="contained" color="primary">
              Let's get started!
            </Button>
            <Button color="primary">Already have a account ?</Button>
          </div>
        </div>

        <div className={classes.heroImage}>
          <Image src="/hero.svg" alt="hero image" height="400" width="480rem" />
        </div>
      </header>
      <section className={classes.heroContainer}>
        <div className={classes.heroContent} style={{ padding: "1rem 3rem" }}>
          <Typography
            variant="h1"
            component="h1"
            align="left"
            className={classes.heroText}
          >
            Fast Delivery
          </Typography>
          <Typography variant="body1" component="h2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra
            enim id commodo semper. Ut facilisis lobortis ante, ut auctor mi
            pharetra accumsan. Nullam in aliquam nunc, ut hendrerit sapien.
            Praesent et suscipit erat. Cras vitae tempor justo. Pellentesque in
            leo eget orci gravida dignissim. Aliquam in justo et orci dictum
            iaculis a at justo. Curabitur in enim et elit suscipit volutpat et
            eu tellus. Nunc cursus eu sem in malesuada. Quisque sagittis auctor
            libero ut scelerisque. Suspendisse vitae nisi turpis. Suspendisse
            elit est, elementum eget lacus et, cursus eleifend nisi. Etiam quis
            cursus libero, at porta neque. Duis quis porttitor velit. Sed
            vulputate erat eget lacus placerat, ut aliquet lectus dignissim.
          </Typography>
          <br />
          <div>
            <Button variant="contained" color="primary">
              Post you Request!
            </Button>
          </div>
        </div>

        <div
          className={classes.heroImage}
          style={{ backgroundColor: "transparent", borderRadius: 0 }}
        >
          <Image
            src="/hero2.svg"
            alt="hero image"
            height="520"
            width="600rem"
          />
        </div>
      </section>
      <section className={classes.heroContainer}>
        <div className={classes.heroImage}>
          <Image
            src="/hero3.svg"
            alt="hero image"
            height="400"
            width="480rem"
          />
        </div>

        <div
          className={classes.heroContent}
          style={{
            padding: "1rem 2.5rem",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            align="left"
            className={classes.heroText}
          >
            Earn Money
          </Typography>
          <Typography variant="body1" component="h2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra
            enim id commodo semper. Ut facilisis lobortis ante, ut auctor mi
            pharetra accumsan. Nullam in aliquam nunc, ut hendrerit sapien.
            Praesent et suscipit erat. Cras vitae tempor justo. Pellentesque in
            leo eget orci gravida dignissim. Aliquam in justo et orci dictum
            iaculis a at justo. Curabitur in enim et elit suscipit volutpat et
            eu tellus. Nunc cursus eu sem in malesuada. Quisque sagittis auctor
            libero ut scelerisque. Suspendisse vitae nisi turpis. Suspendisse
            elit est, elementum eget lacus et, cursus eleifend nisi. Etiam quis
            cursus libero, at porta neque. Duis quis porttitor velit. Sed
            vulputate erat eget lacus placerat, ut aliquet lectus dignissim.
          </Typography>
          <br />
          <div>
            <Button variant="contained" color="primary">
              Start making money!
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
