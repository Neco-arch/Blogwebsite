import axios from "axios";
import { useEffect, useState } from "react";

function RenderSignup() {
    const [formData , SaveFormData] = useState({
        email : "" , username : "" , password : "" , confirmPassword : "" 
    })

    const handlechange = (e) => {
        SaveFormData({...formData , [e.target.name] : e.target.value})
    }

    const Signupuser = async (e) => {
        e.preventDefault()
        try {
            if (formData.password !== formData.confirmPassword) {
                alert("Password and confirmPassword isn't the same")
                window.location.href = "/signup"
            }
            const result = await axios.post('http://localhost:5000/sign_up' , formData)
            console.log(result.status)
        } catch(error) {
            alert("Username or email has been taken")
            window.location.href = "/signup"
        }
    }

  return (
    <div>
      <form onSubmit={Signupuser}>
        <label>Email: <input type="text" name="email" value={formData.email} onChange={handlechange} required/></label>
        <label>Username: <input type="text" name="username" value={formData.username} onChange={handlechange} required/></label>
        <label>Password: <input type="password" name="password" value={formData.password} onChange={handlechange} required/></label>
        <label>Confirm Password: <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handlechange} required/></label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RenderSignup


