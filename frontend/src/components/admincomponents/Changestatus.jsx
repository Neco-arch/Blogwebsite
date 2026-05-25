import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Editform from "./Editform";

function ChangeStatus({ articleid  , openstatus , onClose}) {

    const dialogRef = useRef(null);

    const changestatus_release_unrelease = async(status) => {
        try {

            if (articleid === 0 ) return ;


            if (status === 'publish') {
                const result = await axios.patch('http://localhost:5000/blog/' + articleid )
                window.location.href = '/blogpanel'
                return
            } 

            if (status === 'draft') {
                const result = await axios.patch('http://localhost:5000/blog/' + articleid + '/unrelease' )
                window.location.href = '/blogpanel'
                return
            }
            return 'Status not choosen'
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <>
        <dialog open={openstatus} ref={dialogRef}>
            <button onClick={() => changestatus_release_unrelease('publish')}>publish</button>
            <button onClick={() =>  changestatus_release_unrelease('draft')}>draft</button>
            <button onClick={onClose}>Close</button>
        </dialog>
        </>
    )
}


export default ChangeStatus