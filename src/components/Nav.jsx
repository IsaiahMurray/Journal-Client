import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  logout: {
    border: "1px solid white",
    color: "white",
    marginLeft: "70%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "45%"
    },
  },
  title: {
    marginLeft: "-15vw",
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "4vw"
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "-5vw"
    },
  },
  root: {
    flexGrow: 1,
    width: "100%"
  },
  toolbar: {
    width: "100%"
  },
  appbar: {
    width: "100%"
  }
}));

const Nav = (props) => {
const classes = useStyles();

const logout = () => {
  props.clickLogout();
}

  return (
    <div className={classes.root}>
      <AppBar id="app-bar" position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          My Journal
        </Typography>
        <Button className={classes.logout} id="logout-button" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
    </div>
    )
}
export default Nav;