import React, { useState, useEffect } from "react";
import Journals from "./Journals";
import JounalCreate from "./JournalCreate";

const JournalDisplay = (props) => {
  const [journalArray, setJournalArray] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(
    "http://localhost:3000/journal/practice"
  );

  useEffect(() => {
    console.log("Loading component");
    console.log(props.token)
    fetchJournals();
  }, [])

  const fetchJournals = async() => {
    setJournalArray([]);
    console.log("Calling fetch");
    console.log(props.token);
    try{
      let res = await fetch("http://localhost:3000/journal/practice", {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
      })

    console.log("RESPONSE:", res); 

      let data = await res.json();
      console.log(`Data: ${data.message}`);

    }catch(err){
      console.log(err);
    }

    // fetch(fetchUrl, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: props.token,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((journalArray) => {
    //     setJournalArray(journalArray);
    //     console.log(journalArray);
    //   })
    //   .catch((err) => console.log(err));
  };

  const updateJournal = (postId, updateEntry) => {
    fetch(`http://localhost:3000/journal/update/${postId}`, {
      method: "PUT",
      body: JSON.stringify(updateEntry),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
      }),
    }).then((res) => {
      console.log(res);
      console.log(updateEntry);
      alert("Your journal entry has been updated!");
    })
    .finally(fetchJournals());
  };

  const deleteJournal = (postId) => {
    console.log('deleteJournal working')
    console.log(postId)
    fetch(`http://localhost:3000/journal/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: props.token
      }
    })
      .then(response => {
        console.log(response);
      })
  }

  return (
    <div>
      <JounalCreate fetchJournals={fetchJournals} token={props.token} />
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
