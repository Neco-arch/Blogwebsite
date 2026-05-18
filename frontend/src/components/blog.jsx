import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { renderToPipeableStream } from "react-dom/server";

function blogpage() {
  const [blogs, setblogs] = useState([]);
  const [Ready_display, setReady_display] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:5000",
  });
  const fetchblogs = async () => {
    try {
    const response = await axios.get("http://localhost:5000/");
    setblogs(response.data.post);
    setReady_display(true)
    } catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchblogs();
  } , []);


if (Ready_display) {
  return (
    <>
      {blogs.map((value, index) => (
        <div key={index}>
          <h2>Title : {value.title}</h2>
          <h3>Author : {value.author}</h3>
        </div>
      ))}
    </>
  );
}

}

export default blogpage;
