import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import Presentation from "./Presentation";
export default function Learn() {
    const location = useLocation();
    const [obj, setObj] = useState("");

    useEffect(() => {
        fetchData()
    }, [])


    async function fetchData() {
        const url = "http://localhost:2003/product/learn";
        const obj = {
            "topic": location.state.topic,
            "subtopic": location.state.subtopic
        }
        const servermesg = await axios.post(url, obj);
        if (servermesg.data.status === true) {
            alert(JSON.stringify(servermesg.data.response));
            setObj(servermesg.data.response);
        } else {
            alert(JSON.stringify(servermesg.data));
        }
    }

    return (
        <>
            <div>
                {location.state.topic}
                {location.state.subtopic}

                {<div>
                    {obj && Object.keys(obj).length > 0 ? <Presentation data={obj} /> : <div>Loading...</div>}
                </div>}
            </div>
        </>
    )
}