import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "@material-ui/core";
import Nav from "./../src/components/layout/Nav";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    minHeight: "calc(100vh - (43px + 2rem))",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "repeat(2, 1fr)",
    },
  },
  heroText: {
    fontWeight: "bolder",
    fontSize: "4.5rem",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      fontSize: "3.5rem",
    },
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
    padding: "1rem .8rem",
    [theme.breakpoints.down("sm")]: {},
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
  },
  cta: {
    margin: ".8rem 0",
  },
  contentPoints: {
    margin: ".4rem 0",
  },
}));

/**
 * The Main Index Page
 */

const Index = () => {
  const classes = useStyles();
  return (
    <>
      <Nav />
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
            An Intra Campus Delivery Service
          </Typography>
          <div className={classes.heroBtnGroup}>
            <Link href="/auth/signup">
              <Button variant="contained" color="primary">
                Let's get started!
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button color="primary">Already have a account ?</Button>
            </Link>
          </div>
        </div>

        <div className={classes.heroImage}>
          <Image src="/hero.svg" alt="hero image" height="500" width="580rem" />
        </div>
      </header>
      <section className={classes.heroContainer}>
        <div className={classes.heroContent}>
          <Typography
            variant="h1"
            component="h1"
            align="left"
            className={classes.heroText}
          >
            Fast Delivery
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.contentPoints}
          >
            ✔ Do you have some stuff that needs to be delivered? Voila, you have
            reached the right place.
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.contentPoints}
          >
            ✔ We offer convenient, hassle-free, reliable delivery services at
            affordable rates. On-time delivery? No damages? Best prices? We got
            it all covered.
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.contentPoints}
          >
            ✔ Helping you connect better, connect further. We are here to make
            your couriers fly.
          </Typography>
          <br />
          <div>
            <Button variant="contained" color="primary" className={classes.cta}>
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
            alt="Fast Delivery"
            height="520px"
            width="600px"
          />
        </div>
      </section>
      <section className={classes.heroContainer}>
        <div className={classes.heroContent}>
          <Typography
            variant="h1"
            component="h1"
            align="left"
            className={classes.heroText}
          >
            Earn Money
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.contentPoints}
          >
            ✔ Want to make some quick money in your spare time? Then welcome on
            board!
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.contentPoints}
          >
            ✔ Campus share, a platform that allows people to get paid in return
            for successfully completing deliveries.
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            className={classes.contentPoints}
          >
            ✔ Transparent policies, accountable process, competitive wages, work
            at self-pace, satisfaction.
          </Typography>
          <div>
            <Button variant="contained" color="primary" className={classes.cta}>
              Start making money!
            </Button>
          </div>
        </div>

        <div
          className={classes.heroImage}
          style={{ width: "80%", justifySelf: "end", marginRight: "1rem" }}
        >
          <Image
            src="/hero3.svg"
            alt="Earn Money"
            height="400px"
            width="480px"
          />
        </div>
      </section>
    </>
  );
};

export default Index;
