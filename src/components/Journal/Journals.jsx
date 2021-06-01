import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Button from "@material-ui/core/Button";
import Journal from "./Journal";
import JournalCreate from "./JournalCreate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: "80vh",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Journals = (props) => {
  const classes = useStyles();
  const [fetchUrl, setFetchUrl] = useState(
    "http://localhost:3000/journal/mine"
  );

  // useEffect(() => {
  //   console.log("props:", props)
  //   props.fetchJournals();
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  let buttonView;

  if (fetchUrl === "http://localhost:3000/journal/mine") {
    buttonView = "";
  } else {
    buttonView = (
      <Button onClick={setFetchUrl("http://localhost:3000/journal/mine")}>
        All Journals
      </Button>
    );
  }

  return (
    <div className={classes.root}>
        <GridList cellHeight={250} className={classes.gridList}>
          {buttonView}
          {props.journalArray.map((journal) => (
            <Journal journal={journal} updateJournal={props.updateJournal} deleteJournal={props.deleteJournal} fetchJournals={props.fetchJournals}/>
          ))}
        </GridList>
    </div>
  );
};
export default Journals;
