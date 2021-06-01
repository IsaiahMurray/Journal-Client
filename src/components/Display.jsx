import JournalDisplay from './Journal/JournalDisplay';
import Nav from './Nav';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  spacing: {
    justifyContent: 'center',
  }
}))



const Display = (props) => {
const classes = useStyles();

  return (
    <div className={classes.spacing}>
      <Nav clickLogout={props.clickLogout}/>
      <JournalDisplay token={props.token} />
    </div>
  );
}
export default Display;
