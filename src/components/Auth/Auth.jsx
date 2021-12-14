import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Button,
  Snackbar,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  grid: {
    justifyContent: "center",
    height: "90%",

    //* Mobile
    [theme.breakpoints.down("sm")]: {
      height: '70%'
    },
  },
  card: {
    borderRadius: "10%",
    justifyContent: "center",
    marginTop: "10vh",
    boxShadow: "5px 5px 10px grey",
    backgroundColor: "white",
    border: "2px solid #3f51b5",

    //! Styling alterations for screen breakpoints
    //* Mobile
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      width: "100vw",
      height: "80vh",
      borderRadius: "0%",
      boxShadow: "0px 0px 0px white",
      border: "2px solid white",
    },
    [theme.breakpoints.up("sm")]: {
      width: "400px",
      height: "450px",
      borderRadius: "10%",
      border: "2px solid #3f51b5",
    },
    //* Tablet/Desktop
    [theme.breakpoints.up("md")]: {
      width: "400px",
      height: "450px",
    },
    //* Desktop and higher
    [theme.breakpoints.up("lg")]: {
      width: "400px",
      height: "450px",
    },
  },
  title: {
    marginBottom: 0,
    marginTop: "10%",
    color: "#3f51b5",
    // fontFamily: 'Playball',
  },
  signupFields: {
    height: "100%",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    fontFamily: "'Dancing Script', cursive;", 
      //* Mobile
      [theme.breakpoints.down("sm")]: {
        marginTop: "20px",
      },
  },
  toggle: {
    marginBottom: "10px",

      //* Mobile
      [theme.breakpoints.down("sm")]: {
        marginBottom: "0px",
        marginTop: "50px"
      },
  },
}));

const Auth = (props) => {
  const classes = useStyles();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleOpen = (code, message, sev) => {
    setSeverity(sev)
    setAlert(message)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  const title = () => {
    return login ? "Login" : "Signup";
  };

  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login);
  };


  let APIURL = !login ? "https://ism-journal-server.herokuapp.com/user/register" :"https://ism-journal-server.herokuapp.com/user/login" ;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch(`${APIURL}`, {
        method: "POST",
        body: JSON.stringify({ email: email, name: name, password: password }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      let data = await res.json();
      if (!res.ok) {
        handleOpen(res.status, data.message, "error")
        throw new Error(res.staus)
      }

      props.updateToken(data.token);
      handleOpen(200, "You're logged in!", "success");

    } catch (error) {
      console.error("THIS IS THE ERROR: ", error);
    }
  };

  const signupFields = () =>
    !login ? (
      <>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={name}
        />
        <br />
      </>
    ) : null;

  return (
    <Container id="container" container className={classes.card}>
      <Grid
        id="login-signup-grid"
        className={classes.grid}
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid id="login-signup" item className={classes.signupFields}>
          <h1 className={classes.title}>{title()}</h1>
          <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severity}>
                {alert}
              </Alert>
            </Snackbar>
            <form
              className={classes.form}
              id="login-signup-form"
              onSubmit={handleSubmit}
            >
              {signupFields()}
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                autoFocus
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                required
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
              />
              <br />
              <Button
                className={classes.button}
                id="login-signup-button"
                type="submit"
                variant="contained"
                color="primary"
              >
                 Submit
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
      <Button
        className={classes.toggle}
        id="toggle-button"
        onClick={loginToggle}
      >
        {!login ? "Login here!" : "Register here!"}
      </Button>
    </Container>
  );
};
export default Auth;
