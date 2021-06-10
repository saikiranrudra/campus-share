import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { Button, Paper } from "@material-ui/core";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image src="/logo.svg" alt="logo" width="400" height="600" />
        <Typography variant="h2" align="center">
          Campus Share
        </Typography>
      </div>
      <Typography variant="body1" align="center">
        An Inter Campus Delivery Service
      </Typography>
      <Paper
        style={{ display: "grid", placeContent: "center", padding: "2rem" }}
      >
        <Button variant="contained" color="primary">
          Material UI Integrated
        </Button>
      </Paper>
    </Container>
  );
}
