import { useState, useEffect } from "react"
import axios from "axios"

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authtoken')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config  
})

function Dashboard() {
    const [userdata , saveuserdata] = useState({})
    const [result, setResult] = useState(null)
    const [blogs , saveblog] = useState([])
    const [Newpostdata , SaveNewpostdata] = useState({})

    const callApi = async () => {
        try {
            const response = await axios.get('http://localhost:5000/blogpanel')
            setResult(response.data)  
        } catch (error) {
            if (error.response?.status === 401) {
                window.location.href = '/'  
            }

            if (error.response.status === 403) {
                alert("Forbidden access")
                window.location.href = '/'
            }
            console.error(error)
        }
    }

    const getallblog = async () => {
        try {
            const response = await axios.get('http://localhost:5000/allblog')
            saveblog(response.data)
        } catch (error) {
            if (error.response.status === 403) {
                alert("Forbidden access")
                window.location.href = '/'
            }
        }
    }

    const decodetoken = async () => {
        try {
            const decodedtoken = await axios.post('http://localhost:5000/decodejwt' , { token: localStorage.getItem('authtoken') })
            saveuserdata(decodedtoken.data.decoded)
        } catch(error) {
            console.log(error)
       }
    }

    const createnewpost = async () => {

    }

    useEffect(() => {
        callApi()
        decodetoken()
        getallblog()
    }, [])


    return (
        <>
        <div>
            <h2>Welcome back owner</h2>
            <div>
                <button>New Post</button>
            </div>
        </div>
        <dialog>
            <form onSubmit={createnewpost}>
                
            </form>
        </dialog>
        </>
    )
}

export default Dashboard