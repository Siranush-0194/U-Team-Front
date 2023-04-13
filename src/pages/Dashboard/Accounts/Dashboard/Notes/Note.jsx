import { DeleteOutlined } from "@ant-design/icons";
import './style.css'

function Note({ id, text, deleteNote }) {
  return (
    <div className="note">
      <div className="note__body">{text}</div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <DeleteOutlined
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
        ></DeleteOutlined>
      </div>
    </div>
  );
}

export default Note;