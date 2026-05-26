import { useEffect } from "react"

export default function logout() {
    const remove_token = () => {
        window.localStorage.removeItem('authtoken')
        window.location.href = "/"
    }

    useEffect(() => {
        remove_token() 
    },[])


    return (
        <>
        </>
    )
}

