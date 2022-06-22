import React, { useState, useEffect } from "react";
import Journals from "./Journals";

import APIURL from '../../helpers/environment';

const JournalDisplay = (props) => {
  const [journalArray, setJournalArray] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, [])

  const fetchJournals = async() => {
    setJournalArray([]);
    try{
      let res = await fetch(`${APIURL}/journal/mine`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
      })
      let data = await res.json();
      setJournalArray(data.foundJournals);

    }catch(err){
      console.log(err);
    }
  };

  const updateJournal = (postId, updateEntry) => {
    fetch(`${APIURL}/journal/edit/${postId}`, {
      method: "PUT",
      body: JSON.stringify(updateEntry),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      }),
    }).then((res) => {
      alert("Your journal entry has been updated!");
    })
    .finally(fetchJournals());
  };

  const deleteJournal = (postId) => {
    fetch(`${APIURL}/journal/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: props.token
      }
    })
      .then(response => {
        alert("Your journal entry has been deleted.")
      })
  }

  return (
    <div>
      <Journals
        fetchJournals={fetchJournals}
        updateJournal={updateJournal}
        journalArray={journalArray}
        deleteJournal={deleteJournal}
        token={props.token}
      />
    </div>
  );
};

export default JournalDisplay;
