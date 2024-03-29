import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Button from "@material-ui/core/Button";
import Journal from "./Journal";
import JournalCreate from "./JournalCreate";

import APIURL from '../../helpers/environment';

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
    height: "84vh",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Journals = (props) => {
  const classes = useStyles();
  const [fetchUrl, setFetchUrl] = useState(`${APIURL}/journal/mine`);

  let buttonView;

  if (fetchUrl === `${APIURL}/journal/mine`) {
    buttonView = "";
  } else {
    buttonView = (
      <Button onClick={setFetchUrl(`${APIURL}/journal/mine`)}>
        All Journals
      </Button>
    );
  }

  return (
    <>
      <JournalCreate token={props.token} fetchJournals={props.fetchJournals} />
      <div className={classes.root}>
        <GridList cellheight={250} className={classes.gridList}>
          {buttonView}
          {props.journalArray.map((journal) => (
            <Journal
              journal={journal}
              updateJournal={props.updateJournal}
              deleteJournal={props.deleteJournal}
              fetchJournals={props.fetchJournals}
            />
          ))}
        </GridList>
      </div>
    </>
  );
};
export default Journals;
