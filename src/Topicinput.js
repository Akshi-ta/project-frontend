import { React, useEffect, useState } from 'react';
import axios from "axios";
import { baseURL } from "./services/axios-config";
import SubTopics from './SubTopics';
import { useNavigate } from "react-router-dom";

export default function Topicinput() {
    const [obj, setObj] = useState({});
    const [subtopics, setSubtopics] = useState({});
    const [flag, setflag] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     // localStorage.setItem("topicId", "");
    //     // alert(localStorage.getItem("topicId"));
    //     alert(localStorage.getItem("topic"));
    //     const topicId = localStorage.getItem("topicId");
    //     if (topicId !== "") {
    //         alert("hi");
    //         getSubtopics();
    //     }
    // }, []);

    useEffect(() => {
        (async () => {
            const email = localStorage.getItem("email");
            const servermesg = await axios.get(baseURL + `/product/getUser/${email}`);
            console.log(servermesg.data.out);
            setUserData(servermesg.data.out);
        })();
    }, []);

    useEffect(() => {
        setflag(1);
    }, [subtopics])

    function onChangeListener(event) {
        const { name, value } = event.target;
        setObj({ ...obj, [name]: value });
    }


    async function onClickListener() {
        const url = "http://localhost:2003/product/add";
        const finalObj =
        {
            topic: obj.topic,
            email: localStorage.getItem("email")
        }
        const servermesg = await axios.post(url, finalObj);
        if (servermesg.data.status === true) {
            alert(JSON.stringify(servermesg.data.user))
            console.log("new data", servermesg.data.user.out);
            setUserData(servermesg.data.user.out);
            // localStorage.setItem("topic" , obj.topic);
            // localStorage.setItem("topicId" , servermesg.data.topicId);
            setSubtopics(servermesg.data.subtopics);
            // alert(localStorage.getItem("topicId" ));
        } else {
            alert("error");
        }
    }

    // const dummy = {"topic":"C++","subtopics":[{"subtopic number":1,"subtopic name":"Introduction to C++","duration":"2 hours"},{"subtopic number":2,"subtopic name":"Data Types and Variables","duration":"2 hours"},{"subtopic number":3,"subtopic name":"Operators and Expressions","duration":"2 hours"},{"subtopic number":4,"subtopic name":"Control Flow","duration":"3 hours"},{"subtopic number":5,"subtopic name":"Functions","duration":"4 hours"},{"subtopic number":6,"subtopic name":"Classes and Objects","duration":"5 hours"},{"subtopic number":7,"subtopic name":"Inheritance and Polymorphism","duration":"4 hours"},{"subtopic number":8,"subtopic name":"Templates and Generic Programming","duration":"3 hours"},{"subtopic number":9,"subtopic name":"Advanced C++ Features","duration":"5 hours"}]}

    return (
        <>
            <div className='flex'>
                <div className='w-[20vw] h-[100vh] bg-gray-500'>
                    <button
                    onClick={()=>{
                        setSelectedTab(0);
                    }}
                    >
                        New Chat
                    </button>
                    {(userData !== null) ? userData.topics.map((question, index) => (
                    <div key={question["_id"]} className='bg-blue-500 text-white'>
                        <button
                            onClick={() => {
                                console.log(index+1);
                                setSelectedTab(index+1)
                            }}
                        >
                            {question["topic"]}
                        </button>
                    </div>
                    )) 
                    : <div></div>
                    }
                </div>
                {selectedTab === 0 ?
                    <div className='flex flex-col flex-grow'>
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
                        <div>
                            {flag === 1 && subtopics && Object.keys(subtopics).length > 0 ? <SubTopics data={{ obj, subtopics: subtopics, topic: localStorage.getItem("topic") }} /> : <div></div>}
                        </div>
                    </div>
                    : <div className='flex flex-col flex-grow'>
                        {userData ? <SubTopics data={{ obj, subtopics: userData.topics[selectedTab-1].subtopic, topic: userData.topics[selectedTab-1].topic }} /> : <div></div>}
                    </div>
                }

            </div>
        </>
    )
}