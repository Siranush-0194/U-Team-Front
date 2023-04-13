import { useEffect, useState } from "react";

import Note from "./Note";
import { v4 as uuid } from "uuid";
import './style.css'
import TextArea from "antd/es/input/TextArea";

const Notes = () => {
  const [notes, setNotes] = useState(['']);
  const [inputText, setInputText] = useState("");


  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText,
      },
    ]);
    //clear the textarea
    setInputText("");
  };

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

 

  const charLimit = 100;
  const charLeft = charLimit - inputText.length;
  return(
    <>
    <div className="header">
      <h1 className="notes__title">Notes</h1>
    </div>
  
     
    <div className="notes">
     
      {notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        text={note.text}
        deleteNote={deleteNote}
      />
    ))}
     
  <div className="note" >
  {/* <div className="note-title" >
      <TextArea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Type...."
        onChange={textHandlerTitle}
        maxLength="100"
      ></TextArea>
      </div> */}
      <TextArea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Type...."
        onChange={textHandler}
        maxLength="100"
      ></TextArea>
      <div className="note__footer">
        <span className="label">{charLeft} left</span>
        <button className="note__save" onClick={saveHandler}>
          Save
        </button>
      </div>
     
    </div>
  
  </div>
    
    </>
   
  )
}


export default Notes;