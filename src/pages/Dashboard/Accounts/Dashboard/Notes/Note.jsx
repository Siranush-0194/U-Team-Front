import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './style.css';
import { Button, Input, Tag } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

function Note({ id, content, title, tags,onDelete, onEdit,media }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Create an object containing the updated note data
    const updatedNote = {
      title: newTitle,
      content: newContent,
    };
    onEdit(id, updatedNote);

    // Exit editing mode and reset the input fields
    setEditing(false);
    setNewTitle(title);
    setNewContent(content);
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
        
            <Button  className="note__save" onClick={handleSave}>Save</Button>
          
          </div>
        </div>
      ) : (
        <>
      
      {/* <Tag  key={id} style={{height:'30px', width:"265px"}}  color="#108ee9" >{tag}</Tag>
     */}
      <div className="noteTag">{tags} </div>

      <div className="noteTitle">{title}  </div>
      <div className="note__body">{content}</div>
      <div className="note__image">{media}</div>


      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <DeleteOutlined
          className="note__delete"
          key="delete" 
          onClick={() => onDelete(id)}
          // aria-hidden="true"
        />
        <EditOutlined
          className="note__edit"
          key="edit"
          onClick={() => handleEdit(id)}

        />
      </div>
        </>
      )}

  
    </div>
  );
}

export default Note;