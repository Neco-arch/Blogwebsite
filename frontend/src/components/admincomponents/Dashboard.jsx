import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Editform from "./Editform";
import ChangeStatus from "./Changestatus";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authtoken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

function Dashboard() {
  const editorRef = useRef(null);
  const [userdata, saveuserdata] = useState({});
  const [result, setResult] = useState(null);
  const [blogs, saveblog] = useState([]);
  const [Newpostdata, SaveNewpostdata] = useState({
    title: "",
    content: "Start typing here...",
    status: "",
  });

  // Edit and Create Form 
  const [editpostdata , Seteditpostdata] = useState()
  const [OCdialog, setOCdialog] = useState(false);
  const [OCeditdialog , setOCeditdialog] = useState(false)
  const [articleinfocus , changearticleinfocus] = useState(0)

  //Change status Form

  const [status_dialog , setstatus_dialog] = useState(false)

  const callApi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogpanel");
      setResult(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = "/";
      }

      if (error.response.status === 403) {
        alert("Forbidden access");
        window.location.href = "/";
      }
      console.error(error);
    }
  };

  const getallblog = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allblog");
      saveblog(response.data);
    } catch (error) {
      if (error.response.status === 403) {
        alert("Forbidden access");
        window.location.href = "/";
      }
    }
  };

  const decodetoken = async () => {
    try {
      const decodedtoken = await axios.post("http://localhost:5000/decodejwt", {
        token: localStorage.getItem("authtoken"),
      });
      saveuserdata(decodedtoken.data.decoded);
    } catch (error) {
      console.log(error);
    }
  };

  const onchangenewpost = (e) => {
    SaveNewpostdata({ ...Newpostdata, [e.target.name]: e.target.value });
  };

  const onEditorChange = (content) => {
    SaveNewpostdata((prev) => ({ ...prev, content }));
  };

  const createnewpost = async (e) => {
    setOCdialog(false)
    e.preventDefault();
    try {
        const data = {...Newpostdata ,
        content : Newpostdata.content.replace(/<\/?p>/g, ''), 
        username: userdata.user,
        userid: parseInt(userdata.userid)
      }
      const result = await axios.post(
        "http://localhost:5000/Createblog",
        data
      );
      SaveNewpostdata({
        title:"",
        content:"Start typing here...",
        status:"",
      });

    } catch (error) {
      console.log(error);
    }
  };

  const openeditform = (e,value) => {
    changearticleinfocus(value.postid)
    setOCeditdialog(true)
  }

  // openstatusdialog 

  const openstatusdialog = (e,value) => {
    changearticleinfocus(value.postid)
    setstatus_dialog(true)
  }

  useEffect(() => {
    callApi();
    decodetoken();
    getallblog();
  }, []);

  return (
    <>
      <div>
        <h2>Welcome back owner</h2>
        <div>
          <button
            onClick={() => {
              setOCdialog(true);
            }}
          >
            New Post
          </button>
        </div>
      </div>
      <div className="All_blog_post">
        {blogs.map((value,index) => (
            <div key={index}>
                <h2>{value.title}</h2>
                <h3>status : {value.poststatus}</h3>
                <button onClick={(e) => {
                    openeditform(e,value)
                }}>Edit</button>
                <button  onClick={(e) => {
                  openstatusdialog(e,value)
                }}>Change Status</button>
            </div> 
        ))}
      </div>
      <dialog open={OCdialog} className="Createnewpost">
        <form onSubmit={createnewpost}>
          <label>
            Title of article :{" "}
            <input
              type="text"
              name="title"
              value={Newpostdata.title}
              onChange={onchangenewpost}
            />
          </label>
          <Editor
            apiKey={import.meta.env.VITE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="Start typing here..."
            init={{
              height: 500,
              menubar: false,
              promotion: false,
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
            value={Newpostdata.content}
            onEditorChange={onEditorChange}
          />
          <input type="submit"/>
        </form>
        <button
          onClick={() => {
            setOCdialog(false);
          }}
        >
          Close Dialog
        </button>
      </dialog>
      <Editform articleid={articleinfocus} open={OCeditdialog} onClose={() => { setOCeditdialog(false)  }}>
          
      </Editform>

      <ChangeStatus openstatus={status_dialog} articleid={articleinfocus} onClose={() => { setstatus_dialog(false )}}>

      </ChangeStatus>
    </>
  );
}

export default Dashboard;
