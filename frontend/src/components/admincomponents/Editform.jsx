  import { useState, useEffect, useRef } from "react";
  import axios from "axios";
  import { Editor } from "@tinymce/tinymce-react";

  function Editform({ open, articleid, onClose }) {
    const editorRef = useRef(null);
    const [formdata, saveformdata] = useState({
      content: "",
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



    const onEditorChange = (content) => {
      saveformdata((prev) => ({ ...prev, content }));
    };

const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await axios.put('http://localhost:5000/blog/' + articleid, {
      newtitle: formdata.title,
      newcontent: formdata.content.replace(/<\/?p>/g, ''),
    });
    onClose();
    window.location.href = "http://localhost:5173/blogpanel"
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
      if (articleid === 0) return;
      callapiarticleid();
    }, [articleid]);

    return (
      <dialog open={open}>
        <form onSubmit={handlesubmit}>
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
            initialValue="Start typing here..."
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
          <button type="submit">Edit Post</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </dialog>
    );
  }

  export default Editform;
