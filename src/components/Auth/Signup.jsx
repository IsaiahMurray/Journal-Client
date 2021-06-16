import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "88%",
    margin: "auto",
    marginTop: '3%'
  },
  form:{
    height: '90%',
    paddingTop: '5%'
  },
  button: {
    marginTop: '10%'
  },
}));
//import APIURL from '../../helpers/environment';

let APIURL = "https://ism-journal-server.herokuapp.com";

const Signup = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const setError = (err) => {
    if (err === 409) {
      setErrMessage("Email in use. Try logging in.");
      setOpen(true);
    } else if (err === 500) {
      setErrMessage("Something went wrog...");
      setOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Signup button hit");
    try {
      let res = await fetch(`${APIURL}/user/register`, {
        method: "POST",
        body: JSON.stringify({ email: email, name: name, password: password }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      if (res.status === 409) {
        setError(409);
        throw new Error(409);
      }

      if (res.status === 500) {
        setError(500);
        throw new Error(500);
      }

      let data = await res.json();
      console.log(`Data: ${data}`);
      console.log(`Token: ${data.token}`);
      console.log(`Message: ${data.message}`);
      console.log(`User: ${data.user}`);

      props.updateToken(data.token);
      window.alert("You're signed up!");
    } catch (error) {
      console.error("THIS IS THE ERROR", error);
      handleOpen();
      //window.alert("That email is already in use.. Try logging in!");
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
      <form className={classes.form} id="login-signup-form" onSubmit={handleSubmit}>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
