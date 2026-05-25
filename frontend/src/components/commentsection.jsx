import axios from "axios"
import { useEffect } from "react"

function CommentSection ({post_id}) {
    const decodejwt = async() => {
    const response = await axios.post('/decodejwt' , localStorage.getItem('authtoken'))
    console.log(response.data)
    }

    useEffect(() => {
        decodejwt()
    })
}

export default CommentSection