import { useEffect, useState } from "react";

import Note from "./Note";

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

    axios_04.post('/api/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // console.log(response.data);
        const noteId = response.data.id;
      })
      .catch(error => console.error(error));
  }
  
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const titleHandler = (e) => {
    setInputTitle(e.target.value);
  };
  const getNoteById = (id) => {
    axios_04.get(`/api/notes/${id}`)
      .then(response => {
        console.log(response.data);
        setNotes(response.data)
        // do something with the retrieved note, such as update the UI
      })
      .catch(error => console.error(error));
  };

  console.log(notes);
  const charLimit = 3000;
  const charLeft = charLimit - inputText.length;
  return (
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
            <button className="note__save" onClick={createNote}>
              Save
            </button>
          </div>

        </div>

      </div>
    </>
  )
}


export default Notes;