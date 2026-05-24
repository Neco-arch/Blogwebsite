import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

function Editform({ open, articleid, onClose }) {
  const editorRef = useRef(null);
  const [formdata, saveformdata] = useState({
    content: "",
    poststatus: "",
    title: "",
  });

  const callapiarticleid = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/blog/" + articleid,
      );
      saveformdata({
        content: response.data.content,
        poststatus: response.data.poststatus,
        title: response.data.title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (e) => {
  const { name, value } = e.target;
  saveformdata((prev) => ({ ...prev, [name]: value }));
};

  useEffect(() => {
    if (articleid === 0) return;
    callapiarticleid();
  }, [articleid]);

  const onEditorChange = (content) => {
    saveformdata((prev) => ({ ...prev, content }));
  };

  return (
    <dialog open={open}>
      <form>
        <label>
          Title of article :{" "}
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={onchange}
          />
        </label>
        <Editor
          apiKey={import.meta.env.VITE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Start typing here...</p>"
          init={{
            height: 500,
            promotion: false,
            menubar: false,
            plugins: [
              "lists",
              "link",
              "image",
              "code",
              "fullscreen",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | " +
              "alignleft aligncenter alignright | bullist numlist | link image | code fullscreen",
          }}
          value={formdata.content}
          onEditorChange={onEditorChange}
        />
        <select name="poststatus" value={formdata.poststatus} onChange={onchange}>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        <button type="submit">Edit Post</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </dialog>
  );
}

export default Editform;
