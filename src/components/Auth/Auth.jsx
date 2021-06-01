import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

const Auth = (props) => {
    const [login, setLogin] = useState(true);

    const title = () => {
        return login ? 'Login' : 'Signup'
    }

    const loginToggle = (event) => {
        event.preventDefault();
        setLogin(!login);
    }

    const signupFields = () => !login ? 
    (
        
        <Grid id="login-signup" item xs={12} sm={6}>
            <h2>{title()}</h2>
            <Signup updateToken={props.updateToken}/>
        </Grid>
    ) : ( 
        <Grid id="login-signup" item xs={12} sm={6} className="login-col">
            <h2>{title()}</h2>
            <Login updateToken={props.updateToken}/>
        </Grid>
    );
    
    return(
        <Container className="auth-container">
            <Grid
            id="login-signup-grid"
            className="auth-grid"
            container
            direction="row"
            justify="space-evenly"
            alignItems="center">
                {signupFields()}
                <br/>
            </Grid>
            <Button id="toggle-button" onClick={loginToggle}>{!login ? 'Login' : 'Signup'}</Button>
        </Container>
    )
}
export default Auth;