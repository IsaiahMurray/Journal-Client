import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  footer: {
    padding: `${theme.spacing.unit * 6}px 0`,
  }
});
function Footer(props) {
  const { classes } = props;
  return (
    <footer id="footer" classname={classes.footer}>
        <Typography component="p">
          ISM Journal
        </Typography>
        <Typography component="p">
          @2022 All rights reserved
        </Typography>
    </footer>
  );
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Footer);