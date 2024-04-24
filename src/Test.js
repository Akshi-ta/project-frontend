import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import QuestionFormat from "./QuestionFormat";
import QnaFormat from "./QnaFormat";
export default function Test() {
    const location = useLocation();
    const [obj, setObj] = useState("");
    const [obj2, setObj2] = useState({
        topicName: "",
        subtopicName: "",
        subtopicId: "",
        testId: ""
    })
    const [testOptions, setTestOptions] = useState([]);
    const [json, setJson] = useState([]);
    useEffect(() => {
        const options = json.map((test) => ({
            id: test['_id'],
            number: test['test number'],
        }));
        setTestOptions(options);
    }, [json]);

    

    const [selectedTest, setSelectedTest] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
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
        const url = "http://localhost:2003/product/test/chat";
        const data = {
            "testId": obj2.testId,
            "message": question
        }
        console.log(data);
        const servermesg = await axios.post(url, data);
        if(servermesg.data.status === true)
        {
            // console.log(servermesg.data.out);
            console.log("Question sent:", question);
            const appendQuestion = (question, response) => {
            setshowQuestion(prevQuestions => [
                ...prevQuestions,
                {
                    question: question,
                    responseByServer: response
                }
            ]);
            console.log(showQuestion);
        };
        const res = servermesg.data.out;
        console.log(res);
        appendQuestion(question, res);
        setQuestion('');
        setShowInput(false);
        }
        else
        {
            alert("error");
        }
        
    };

    const [showDropdown, setShowDropdown] = useState(true);

    const handleSelectTest = (event) => {
        const index = event.target.selectedIndex;
        setSelectedIndex(index);
        console.log(index);
        setSelectedTest(event.target.value);
        setObj(json[selectedIndex-1].Questions);
        setObj2({testId:obj._id});
        console.log(obj);
    };

    async function handleCreateTest(){
        const url = `http://localhost:2003/product/test/new`;
        const object = {
            "topicName": location.state.topic,
            "subtopicName": location.state.subtopic,
            "subtopic": location.state.id
        }
        const servermesg = await axios.post(url, object);
        if (servermesg.data.status === true) {
            setObj(servermesg.data.questions);
            setObj2({testId:servermesg.data.response.testId})
        }
        else{
            console.log("error");
        }
    };

    useEffect(() => {
        const fetchDataAndProceed = async () => {
            // alert(location.state.id);
            await fetchData();
            // If testOptions array is still empty after fetching data, hide dropdown and simulate click on "Create New Test" button
            if (testOptions.length === 0) {
                setShowDropdown(false);
                document.getElementById('createButton').click();
            }
        };
    
        fetchDataAndProceed();
    }, []);


    async function fetchData() {
        const url = `http://localhost:2003/product/test/${location.state.id}`;
        const servermesg = await axios.get(url);
        if (servermesg.data.status === true) {
            console.log("here");
            console.log(servermesg);
            setJson(servermesg.data.rec.test)
        } else {
            alert(JSON.stringify(servermesg.data));
        }
    }

    return (
        <>
            <div>
                <div className="m-4">
                    {showDropdown && (
                        <select
                            value={selectedTest}
                            onChange={handleSelectTest}
                            className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="" disabled>Select Test</option>
                            {testOptions.map((test) => (
                                <option key={test.id} value={test.id}>
                                    Test {test.number}
                                </option>
                            ))}
                        </select>
                    )}
                    <button
                        onClick={handleCreateTest}
                        id="createButton"
                        className="mt-2 ml-2 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md cursor-pointer"
                    >
                        Create New Test
                    </button>
                </div>
                
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
                {<div>
                    {obj.length > 0 ? <QuestionFormat data={obj} props={obj2} /> : <div>Loading...</div>}
                </div>}
                {
                    showQuestion.length > 0 ? <QnaFormat data={showQuestion} /> : ""
                }
            </div>
        </>
    )
}