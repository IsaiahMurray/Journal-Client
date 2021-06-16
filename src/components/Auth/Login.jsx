import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "88%",
    margin: "auto",
    marginTop: '3%',
  },
  form:{
    height: '90%',
    paddingTop: '5%'
  },
  button: {
    marginTop: '10%'
  },
}));

// import APIURL from '../../helpers/environment';

let APIURL = 'https://ism-journal-server.herokuapp.com';

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const setAlertMessage = (err) => {
    if(err === 401){
      setAlert("Login failed. Incorrect password.");
      setOpen(true);
    } else if(err === 404){
      setAlert("Not found. User does not exist.");
      setOpen(true);
    } else{
      setAlert("Something went wrong...");
      setOpen(true);
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login button hit");
    try {
      let res = await fetch(`${APIURL}/user/login`, {
        // mode: "no-cors",
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      if (res.status === 401) {
        setAlertMessage(401);
        throw new Error(401);
      }

      if (res.status === 404) {
        setAlertMessage(404);
        throw new Error(404);
      }

      if (res.status === 500) {
        setAlertMessage(500);
        throw new Error(500);
      }

      let data = await res.json();
      console.log(`Data: ${data}`);
      console.log(`Token: ${data.token}`);
      console.log(`Message: ${data.message}`);
      console.log(`User: ${data.user}`);


      props.updateToken(data.sessionToken);
  
    } catch (err) {
      handleOpen();
      console.log(err);
    }
  };
  return (
    <div className={classes.root}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {alert}
      </Alert>
    </Snackbar>
      <form className={classes.form} id="login-signup-form" onSubmit={handleSubmit}>
        <br />
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
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;