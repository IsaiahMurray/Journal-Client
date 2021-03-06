import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  logout: {
    
  },
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
}));

const Nav = (props) => {
const classes = useStyles();

const logout = () => {
  console.log("Logout button clicked");
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