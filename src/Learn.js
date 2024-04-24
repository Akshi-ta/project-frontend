import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import Presentation from "./Presentation";
import QnaFormat from "./QnaFormat";
export default function Learn() {
    const location = useLocation();
    const [obj, setObj] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [question, setQuestion] = useState('');
    const [showQuestion, setshowQuestion] = useState([]);

    const toggleInput = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    async function handleSend() {
        const url = "http://localhost:2003/product/learn/chat";
        const data = {
            "topicName": location.state.topic,
            "subtopicName": location.state.subtopic,
            "subtopicId": location.state.id,
            "message": question
        }
        const servermesg = await axios.post(url, data);
        // alert(JSON.stringify(servermesg.data.response));
        console.log("Question sent:", question);
        // setshowQuestion(...showQuestion,
        //     {
        //         "question": question,
        //         "responseByServer": servermesg.data.response
        //     }
        // );
        // setshowQuestion(prevQuestions => [
        //       ...prevQuestions,
        //       {
        //         question: question,
        //         responseByServer: servermesg.data.response
        //       }
        //     ]);
        const appendQuestion = (question, response) => {
            setshowQuestion(prevQuestions => [
              ...prevQuestions,
              {
                question: question,
                responseByServer: response
              }
            ]);
          };
          
          // Assuming 'question' and 'servermesg.data.response' are available here
          appendQuestion(question, servermesg.data.response);
        
        //   setObj(...obj , question)
        // Reset the input field and show the "Ask Question" button again
        setQuestion('');
        setShowInput(false);
    };

    useEffect(() => {
        fetchData()
    }, [])


    async function fetchData() {
        const url = "http://localhost:2003/product/learn";
        const obj = {
            "topicName": location.state.topic,
            "subtopicName": location.state.subtopic,
            "subtopicId": location.state.id
        }
        const servermesg = await axios.post(url, obj);
        if (servermesg.data.status === true) {
            // alert(JSON.stringify(servermesg.data.response));
            setObj(servermesg.data.response.explanation);
        } else {
            alert(JSON.stringify(servermesg.data));
        }
    }


    return (
        <>
            <div>
                {location.state.id}
                {location.state.topic}
                {location.state.subtopic}

                {<div>
                    {obj && Object.keys(obj).length > 0 ? <Presentation data={obj} /> : <div>Loading...</div>}
                </div>}
                {/* {JSON.stringify(showQuestion)} */}
                {
                    showQuestion.length > 0 ? <QnaFormat data={showQuestion} /> : ""
                }
                <div className="fixed bottom-8 right-8">
                    {!showInput && (
                        <button
                            onClick={toggleInput}
                            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                        >
                            Ask Question
                        </button>
                    )}
                    {showInput && (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={question}
                                onChange={handleInputChange}
                                placeholder="Type your question..."
                                className="mt-4 py-2 px-4 rounded-md border border-gray-300 shadow-md focus:outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="ml-4 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                            >
                                Send
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}