import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import Presentation from "./Presentation";
import QuestionFormat from "./QuestionFormat";
export default function Test() {
    const location = useLocation();
    const [obj, setObj] = useState("");

    useEffect(() => {
        fetchData()
    }, [])


    async function fetchData() {
        const url = "http://localhost:2003/product/test";
        const obj = {
            "topicName": location.state.topic,
            "subtopicName": location.state.subtopic,
            "subtopic":location.state.id
        }
        const servermesg = await axios.post(url, obj);
        if (servermesg.data.status === true) {
            alert(JSON.stringify(servermesg.data.response));
            // const responseObject = JSON.parse(servermesg.data.response);
            // alert(JSON.stringify(responseObject));
            // console.log(responseObject);
            // setObj(responseObject);
        } else {
            alert(JSON.stringify(servermesg.data));
        }
    }

    return (
        <>
            <div>
                {location.state.topic}
                {location.state.subtopic}
                {/* {JSON.stringify(obj)} */}
                {<div>
                    {obj && Object.keys(obj).length > 0 ? <QuestionFormat data={obj} /> : <div>Loading...</div>}
                </div>}
            </div>
        </>
    )
}