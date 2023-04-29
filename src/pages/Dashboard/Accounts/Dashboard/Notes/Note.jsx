import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './style.css';
import { Tag } from "antd";

function Note({ id, content, deleteNote, title ,onDelete}) {
  // const handleDelete = () => {
  //   deleteNote(id);
  // }
  
  return (
    <div className="note">
   {/* <Tag  key={id} style={{height:'30px', width:"265px"}}  color="#108ee9" >{tag}</Tag> */}

      <div className="noteTitle">{title}  </div>

      <div className="note__body">{content}</div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <DeleteOutlined
          className="note__delete"
          key="delete" 
          onClick={() => onDelete(id)}
          // aria-hidden="true"
        />
        {/* <EditOutlined
          className="note__edit"
        /> */}
      </div>
    </div>
  );
}

export default Note;