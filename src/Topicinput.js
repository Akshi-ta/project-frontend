import { React, useEffect, useState } from 'react';
import axios from "axios";
import { baseURL } from "./services/axios-config";
import SubTopics from './SubTopics';

export default function Topicinput() {
    const [obj, setObj] = useState({});
    const [subtopics, setSubtopics] = useState({});
    const [flag, setflag] = useState(0);

    useEffect(() => {
        // localStorage.setItem("topicId", "");
        // alert(localStorage.getItem("topicId"));
        alert(localStorage.getItem("topic"));
        const topicId = localStorage.getItem("topicId");
        if (topicId !== "") {
            alert("hi");
            getSubtopics();
        }
    }, []);
    

    useEffect(() => {
        setflag(1);
    }, [subtopics]) 

    async function getSubtopics()
    {
        // alert(localStorage.getItem("topicId"));
        const url = "http://localhost:2003/product/getSubtopics";
        const servermesg = await axios.post(url,{topicId:localStorage.getItem("topicId")} );
        // alert(JSON.stringify(servermesg));
        setSubtopics(servermesg.data.out);
        alert(JSON.stringify(servermesg.data));
        setObj({topic:servermesg.data.topicName})
    }

    function onChangeListener(event) {
        const { name, value } = event.target;
        setObj({ ...obj, [name]: value });

    }


    async function onClickListener() {
        
        const url = "http://localhost:2003/product/add";
        alert(JSON.stringify(obj));
        const finalObj = 
        {
            obj: obj,
            email: localStorage.getItem("email")
        }
        const servermesg = await axios.post(url, finalObj);
        if (servermesg.data.status === true) {
            alert(JSON.stringify(servermesg.data.out))
            localStorage.setItem("topic" , obj.topic);
            localStorage.setItem("topicId" , servermesg.data.topicId);
            setSubtopics(servermesg.data.out);
            alert(localStorage.getItem("topicId" ));
        } else {

            alert(JSON.stringify(servermesg.data));
        }
    }

    // const dummy = {"topic":"C++","subtopics":[{"subtopic number":1,"subtopic name":"Introduction to C++","duration":"2 hours"},{"subtopic number":2,"subtopic name":"Data Types and Variables","duration":"2 hours"},{"subtopic number":3,"subtopic name":"Operators and Expressions","duration":"2 hours"},{"subtopic number":4,"subtopic name":"Control Flow","duration":"3 hours"},{"subtopic number":5,"subtopic name":"Functions","duration":"4 hours"},{"subtopic number":6,"subtopic name":"Classes and Objects","duration":"5 hours"},{"subtopic number":7,"subtopic name":"Inheritance and Polymorphism","duration":"4 hours"},{"subtopic number":8,"subtopic name":"Templates and Generic Programming","duration":"3 hours"},{"subtopic number":9,"subtopic name":"Advanced C++ Features","duration":"5 hours"}]}


    return (
        <>
            {JSON.stringify(obj)}
            {JSON.stringify(subtopics)}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
                        Write the topic you want to understand
                    </label>
                    <div className="mt-2">
                        <input
                            id="topic"
                            name="topic"
                            type="text"
                            required
                            onChange={onChangeListener}
                            value={obj.topic}
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={onClickListener}
                        className="flex w-1/6 mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* {flag === 1 ? <SubTopics data={dummy} ></SubTopics> : ""} */}
            <div>
                {flag === 1 && subtopics && Object.keys(subtopics).length > 0 ? <SubTopics data={{obj , subtopics:subtopics , topic:localStorage.getItem("topic")}} /> : <div>Loading...</div>}
            </div>
            {/* <div>
                {  <SubTopics data={dummy} />}
            </div> */}
        </>
    )
}