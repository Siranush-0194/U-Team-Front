import { useEffect, useState } from "react";

import Note from "./Note";

import './style.css'
import TextArea from "antd/es/input/TextArea";
import { axios_04 } from "../../../../../axios";
import { Button, Input, Upload } from "antd";
import useGetBase64 from "../../../../../hooks/useGetBase64";

const Notes = () => {
  const [notes, setNotes] = useState({ notes: [], nextUrl: null });
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [tag, setTag] = useState("");
  const [media, setMedia] = useState(null);

  const getBase64 = useGetBase64();

  const createNote = () => {
    const formData = new FormData();

    formData.append('title', inputTitle);
    formData.append('content', inputText);
    formData.append('tag', tag);
    media?.file && formData.append('media', media.file.originFileObj);

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
        setTag("");
        setMedia(null);

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

  const tagHandler = (e) => {
    setTag(e.target.value);
  };


  const editNote = (id, updatedNote) => {
    const formData = new FormData();

    formData.append("title", updatedNote.title);
    formData.append("content", updatedNote.content);

    axios_04
      .post(`/api/notes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Update the notes state with the updated note
        const updatedNotes = notes.notes.map((note) => {
          if (note.id === id) {
            return response.data;
          } else {
            return note;
          }
        });

        setNotes({
          notes: updatedNotes,
          nextUrl: notes.nextUrl,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpload = async (data) => setMedia(notes?.media);

  const handlePreview = ({ fileList }) => setMedia({ ...media, fileList });
  const handleChange = async (data) => {
    if (!data.file.url && !data.file.preview) {
      data.file.preview = await getBase64.init(data.file.originFileObj);
    }

    setMedia({
      ...media,
      file: data.file,
    });
  };

  const charLimit = 3000;
  const charLeft = charLimit - inputText.length;

  return (
    <>
      <h1 className="notes__title">Notes</h1>
      <div className="notes" style={{ height: 'auto' }}>
        {notes?.notes?.map(note => {
          return <Note
            key={note.id}
            item={note}
            onEdit={editNote}
            onDelete={deleteNote}
          />
        })}

        <div className="note">
          <Input className="noteTag"
            type="text"
            placeholder="Title"
            value={tag}
            onChange={tagHandler}
          />

          <Input className="noteTitle"
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

          <Upload
            onChange={handleChange}
            onPreview={handlePreview}
            showUploadList={true}
            beforeUpload={getBase64.beforeUploadMedia}
            customRequest={handleUpload}
          >
            <Button>Upload Image</Button>
          </Upload>

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
