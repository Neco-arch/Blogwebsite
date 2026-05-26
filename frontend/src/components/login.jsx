import axios from "axios";
import { configs } from "eslint-plugin-react-hooks";
import { useEffect, useState } from "react";

function Renderlogin() {
    const [formdata , saveformdata] = useState({
        username : "" , password : "" , email : ""
    })


    const handlechange = (e) => {
        saveformdata({...formdata , [e.target.name] : e.target.value})
    }

    const loginuser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/login' , formdata)
            window.localStorage.setItem('authtoken' , response.data.token)
            window.localStorage.setItem('islogin' , true)
            axios.interceptors.request.use((config) => {
                const token = localStorage.getItem('authtoken')
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`
                }
            })
            window.location.href = '/'
        } catch(error) {
            console.log(error)
            alert("User or password not found ")
            window.location.href = "/login"
        }
    }

    return (
    <div>
      <form onSubmit={loginuser}>
        <label>Email: <input type="text" name="email" value={formdata.email} onChange={handlechange} required/></label>
        <label>Username: <input type="text" name="username" value={formdata.username} onChange={handlechange} required/></label>
        <label>Password: <input type="password" name="password" value={formdata.password} onChange={handlechange} required/></label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );



}

export default Renderlogin