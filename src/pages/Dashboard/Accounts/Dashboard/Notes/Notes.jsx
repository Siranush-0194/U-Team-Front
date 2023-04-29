import { useEffect, useState } from "react";

import Note from "./Note";

import './style.css'
import TextArea from "antd/es/input/TextArea";

import { axios_04 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Button, Card, Input, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Notes = () => {
  const [notes, setNotes] = useState({ notes: [], nextUrl: null });
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  // const [tag, setTag] = useState();

  // const user = useSelector(function (state) {
  //   return state?.user;
  // });

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
        setNotes({
          notes: [
            response.data,
            ...notes.notes
          ],
          nextUrl: notes.nextUrl
        });
        setInputText("");
        setInputTitle("");
      })
      .catch(error => console.error(error));      
  }


  useEffect(() => {
    axios_04
      .get(`/api/notes/tag/?from=0&offset=5`)
      .then((response) => {
        setNotes(response.data);       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const deleteNote = (id) => {
    axios_04
      .delete(`/api/notes/${id}`)
      .then((response) => {
        // Filter out the deleted note from the notes state
        setNotes({
          notes: notes.notes.filter((note) => note.id !== id),
          nextUrl: notes.nextUrl,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const titleHandler = (e) => {
    setInputTitle(e.target.value);
  };



  const charLimit = 3000;
  const charLeft = charLimit - inputText.length;

  return (
    <>
      <div className="header">
        <h1 className="notes__title">Notes</h1>
      </div>
      <div className="notes">
        {notes?.notes?.map(note => {

          return <Note
            title={note.title}
            content={note.content}
            // tag={note?.tag?.name}
            key={note.id}
            id={note.id}
            onDelete={deleteNote}
          />
        })}

        <div className="note" >
          <Input  className="noteTitle"
            type="text"
            placeholder="Title"
            value={inputTitle}
            onChange={titleHandler}
            maxLength={100}
          />

          <TextArea
            cols="10"
            rows="5"
            value={inputText}
            placeholder="Type...."
            onChange={textHandler}
            maxLength={charLimit}
          />

          <div className="note__footer">
            <span className="label">{charLeft} left</span>
            <Button className="note__save" onClick={createNote}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes;
