import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Display from './components/Display';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  app: {
    color: "snow"
  },
  welcome: {
    margin: "0px",
     marginBottom: "-20px",

    //! Styling alterations for screen breakpoints
    //* Mobile
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
    //* Tablet/Desktop
    [theme.breakpoints.up("md")]: {
      
    }
  }
}));

const App = () => {
  const classes = useStyles();
  const [sessionToken, setSessionToken] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
    clearToken();
  }, [])

  const updateToken = (newToken) => { 
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken(null);
  }

  const protectedViews = () => {

    return (sessionToken ? <Display updateToken={updateToken} clickLogout={clearToken} token={sessionToken}/>
    : 
    <>
    <h1 className={classes.welcome}>Welcome to your Journal!</h1>
    <Auth updateToken={updateToken}/>
    </>
    )
  }
  return (
    <div className={classes.app}>
     {protectedViews()}
    </div>
  );
}

export default App;
