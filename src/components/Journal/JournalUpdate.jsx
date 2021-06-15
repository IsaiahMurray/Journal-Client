import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "90%",
  },
  card: {
    minWidth: "15rem",
    maxWidth: "30vw",
    minHeight: "40vh",
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
}));

const newDate = new Date();
let defaultDate = newDate.toISOString().slice(0, 10);

const JournalUpdate = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [entry, setEntry] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let journalEntry = {title: title, date: date, entry: entry};
    console.log(journalEntry);
    props.updateJournal(props.journal.id, journalEntry);
    handleClose();
    props.fetchJournals();
  }

  return (
    <div>
        <IconButton type="button" onClick={handleOpen} aria-label="Update">
          <UpdateIcon />
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
              <TextField
                id="journal-title"
                label="Title"
                multiline
                autoFocus
                variant="outlined"
                className={classes.input}
                placeholder={props.journal.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <TextField
                id="journal-date"
                variant="outlined"
                type="date"
                className={classes.input}
                // placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value.toString())}
              />
              <br />
              <br />
              <TextField
                id="journal-entry"
                label="Entry"
                multiline
                rows={4}
                variant="outlined"
                className={classes.input}
                placeholder={props.journal.entry}
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
              <br />
              <br />
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Submit Entry
              </Button>
            </Container>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default JournalUpdate;
