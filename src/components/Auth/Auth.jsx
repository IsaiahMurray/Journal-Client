import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    height: '90%'
  },
  card: {
    borderRadius: "10%",
    justifyContent: "center",
    marginTop: "10vh",
    boxShadow: "5px 5px 10px grey",

    //! Styling alterations for screen breakpoints
    //* Mobile
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      boxShadow: "0px 0px 0px white"
    },
    //* Tablet/Desktop
    [theme.breakpoints.up("md")]: {
      width: "30vw",
      height: "80vh",
    },
    //* Desktop and higher
    [theme.breakpoints.up("lg")]: {
      width: "30vw",
      height: "80vh",
    }
  },
  title: {
    marginBottom: 0,
    marginTop: '10%',
  },
  signupFields: {
    height: "100%",
    width: "100%",
  },
  button: {
    marginTop: 0,
  }
}));

const Auth = (props) => {
  const classes = useStyles();
  const [login, setLogin] = useState(true);

  const title = () => {
    return login ? "Login" : "Signup";
  };

  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login);
  };

  const signupFields = () =>
    !login ? (
      <Grid id="login-signup" item className={classes.signupFields}>
        <h2 className={classes.title}>{title()}</h2>
        <Signup updateToken={props.updateToken} />
      </Grid>
    ) : (
      <Grid id="login-signup" item className={classes.signupFields}>
        <h2 className={classes.title}>{title()}</h2>
        <Login updateToken={props.updateToken} />
      </Grid>
    );

  return (
    <Container id="container" container className={classes.card}>
      <Grid
        id="login-signup-grid"
        className={classes.root}
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {signupFields()}
        <br />
      </Grid>
      <Button
        className={classes.button}
        id="toggle-button"
        onClick={loginToggle}
      >
        {!login ? "Login here!" : "Register here!"}
      </Button>
    </Container>
  );
};
export default Auth;