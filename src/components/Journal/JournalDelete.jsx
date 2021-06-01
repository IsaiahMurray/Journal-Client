import React from "react";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    input: {
      width: "90%",
    },
    card: {
      minWidth: "15rem",
      maxWidth: "30vw",
      minHeight: "30vh",
      padding: "2%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      minWidth: "50%",
      padding: "2%",
    },
    button: {
        margin: 10
    }
}));

const JournalDelete = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e, id) => {
      e.preventDefault();
    props.deleteJournal(id);
    handleClose();
    props.fetchJournals();
  };


  return (
    <div>
      <IconButton type="button" onClick={handleOpen} aria-label="Update">
        <DeleteIcon />
      </IconButton>

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
          <Card className={classes.card}>
          <Container className={classes.container}>
              <h3>Are you sure?</h3>
              <p>It will be gone forever..</p>
              <br />
              <Button className={classes.button} variant="outlined" color="secondary" onClick={(e) => handleDelete(e, props.id)}>
                Delete it!
              </Button>
              <Button className={classes.button} variant="outlined" color="primary" onClick={handleClose}>
                No...
              </Button>
            </Container>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default JournalDelete;
