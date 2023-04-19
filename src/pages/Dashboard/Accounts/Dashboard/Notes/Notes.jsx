import { useEffect, useState } from "react";

import Note from "./Note";
import { v4 as uuid } from "uuid";
import './style.css'
import TextArea from "antd/es/input/TextArea";

import { axios_04 } from "../../../../../axios";

const Notes = () => {

  const [notes, setNotes] = useState(['']);
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");

 

  const createNote = (title, content) => {
    const formData = new FormData();
    formData.append('title', inputTitle);
    formData.append('content', inputText);
  
    axios_04.post('/api/notes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Note created successfully!');
      })
      .catch(error => console.error(error));
  }
  

  

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        title: inputTitle,
        text: inputText,
      },
    ]);
    //clear the textarea
    setInputText("");
    setInputTitle("");

  };

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const titleHandler = (e) => {
    setInputTitle(e.target.value);
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
        title={note.title}
        text={note.text}
        // deleteNote={deleteNote}
      />
    ))}
     
  <div className="note" >
  <input className="noteTitle"
            type="text"
            placeholder="Title"
            value={inputTitle}
            onChange={titleHandler}
          />
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
        <button className="note__save" onClick={ createNote}>
          Save
        </button>
      </div>
     
    </div>
  
  </div>
  </>
  )
}


export default Notes;