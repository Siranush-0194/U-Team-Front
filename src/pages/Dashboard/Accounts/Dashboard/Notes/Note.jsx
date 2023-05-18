import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './style.css';
import { Button, Image, Input } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Notes from "./Notes";

function Note({ item, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newContent, setNewContent] = useState(item.content);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Create an object containing the updated note data
    const updatedNote = {
      title: newTitle,
      content: newContent,
    };
    onEdit(item.id, updatedNote);

    // Exit editing mode and reset the input fields
    setEditing(false);
    setNewTitle(item.title);
    setNewContent(item.content);
  };
  return (
    <div className="note">
      {editing ? (
        <div className="note__edit">
          <Input
            className="noteTitle"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={100}
          />
          <TextArea
            className="note__body"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            maxLength={3000}
          />
          <div className="note__footer">
            <Button className="note__save" onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="noteTitle">{item.title}  </div>
          <div className="note__body">{item.content}</div>
          {item.media?.split('note')[1]  && (
            <Image 
              style={{ height: '190px', objectFit: 'cover' }} 
              className="note__image" 
              src={item.media} 
              fallback={null}
            status="done"

            />
          ) }
          {console.log(item.media)}
       

          <div className="note__footer" style={{ justifyContent: "flex-end" }}>
            <DeleteOutlined
              className="note__delete"
              key="delete"
              onClick={() => onDelete(item.id)}
            />
            <EditOutlined
              className="note__edit"
              key="edit"
              onClick={() => handleEdit(item.id)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Note;