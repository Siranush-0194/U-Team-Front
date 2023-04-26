import { useEffect, useState } from "react";

import Note from "./Note";

import './style.css'
import TextArea from "antd/es/input/TextArea";

import { axios_04 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Notes = () => {

  const [notes, setNotes] = useState({});
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  const user = useSelector(function (state) {
    return state?.user;
  });

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
        // const newNote = response.data;
        // setNotes({...notes, newNote});
     
        setInputText("");
        setInputTitle("");
      })
      .catch(error => console.error(error));
  }
  console.log(notes);

  useEffect(() => {
    axios_04
      .get(`/api/notes/${user.id}`)
      .then((response) => {
       setNotes(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const titleHandler = (e) => {
    setInputTitle(e.target.value);
  };


  function Note({ id, content, deleteNote,title}) {
    return (
      <div className="note">
         <div className="noteTitle">{title}</div>
        <div className="note__body">{content}{title}</div>
        <div className="note__footer" style={{ justifyContent: "flex-end" }}>
          <DeleteOutlined
            className="note__delete"
            onClick={() => deleteNote(id)}
            aria-hidden="true"
          ></DeleteOutlined>
          <EditOutlined
          className="note__edit"        
          />
        </div>
      </div>
    );
  }


  const charLimit = 3000;
  const charLeft = charLimit - inputText.length;
  return (
    <>
      <div className="header">
        <h1 className="notes__title">Notes</h1>
      </div>

      <div className="notes">
{/*        
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
          />
        ))}
     */}

     <Note
     title={notes.title}
     text={notes.text}
     key={notes.id}
     id={notes.id}
     />
       

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
