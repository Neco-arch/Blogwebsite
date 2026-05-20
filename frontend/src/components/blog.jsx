import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Outlet } from "react-router";
import '../css/blog.css'

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
  console.log(blogs)
  return (
    <>
    <h1>Welcome to blog post</h1>
    <h3>Where i post something useful</h3>
    <div className="BlogWrapper">
      {blogs.map((value, index) => (
        <div key={index} onClick={() => {
          window.location.href = `http://localhost:5173/blog/${value.postid}`
        }}>
          <h2>Title : {value.title}</h2>
          <h3>Author : {value.author}</h3>
          <h4>Date : {new Date(value.time).toLocaleString()}</h4>
        </div>
      ))}
    </div>
    </>
  );
}

}

export default blogpage;
