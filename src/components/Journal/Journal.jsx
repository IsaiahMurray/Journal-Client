import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import images from "../Images";
import jouranlImg from '../assets/photo-1452421822248-d4c2b47f0c81.jpg'
import JournalUpdate from "./JournalUpdate";
import JournalDelete from "./JournalDelete";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "45%",
    maxWidth: "50%",
    minWidth: "33%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    height: "90vh",
    width: "50vw",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
  media: {
    height: "10vh",
    width: "50vw",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  buttons: {
  },
  entry: {
    height: "60vh",
    top: 0,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const Journal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <GridListTile
      className={classes.grid}
      cellHeight={250}
      key={props.journal.id}
    >
      <img
        src={images[Math.floor(Math.random() * images.length)]}
        alt={props.journal.title + " image"}
      />
      <GridListTileBar
        title={props.journal.title}
        subtitle={
          <div>
            <span>Date: {props.journal.date}</span>
            <br />
            <AspectRatioIcon type="button" onClick={handleOpen} />
          </div>
        }
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.root}>
            <CardActionArea>
              <img
                className={classes.media}
                src={jouranlImg}
                alt="Random Letters"
              />
              <CardContent className={classes.entry}>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.journal.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.journal.entry}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.buttons}>
              <Tooltip title="Update">
                <IconButton aria-label="delete">
                  <JournalUpdate
                    fetchJournals={props.fetchJournals}
                    journal={props.journal}
                    updateJournal={props.updateJournal}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <JournalDelete
                  fetchJournals={props.fetchJournals}
                  id={props.journal.id}
                  deleteJournal={props.deleteJournal}
                />
              </Tooltip>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </GridListTile>
    </>
  );
};

export default Journal;
