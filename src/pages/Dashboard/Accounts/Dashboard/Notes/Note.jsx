import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './style.css'
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

export default Note;