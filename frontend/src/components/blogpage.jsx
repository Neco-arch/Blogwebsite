import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function BlogSpecificPage() {
    const [data, saveData] = useState(null);
    const { postid } = useParams();

    useEffect(() => {
        axios.get('http://localhost:5000/blog/' + postid).then((value) => {
            saveData(value.data);
            console.log(value.data); // 
        });
    }, [postid]); // 

    if (data !== null) {
        return (<>
        <div>
        <h1>{data.title}</h1>
        <h3>{data.author}</h3>
        <h2>{data.content}</h2>
        </div>
        </>)
    }
}

export default BlogSpecificPage;