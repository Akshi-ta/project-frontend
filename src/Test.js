import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import QuestionFormat from "./QuestionFormat";
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
        alert(JSON.stringify(json));
        const options = json.map((test) => ({
            id: test['_id'],
            number: test['test number'],
        }));
        setTestOptions(options);
    }, [json]);

    

    const [selectedTest, setSelectedTest] = useState('');

    const [showDropdown, setShowDropdown] = useState(true);

    // const testNumbers = [1, 2, 3, 4, 5];

    const handleSelectTest = (event) => {
        setSelectedTest(event.target.value);
    };

    const handleCreateTest = () => {
        alert('New test created');
    };

    useEffect(() => {
        const fetchDataAndProceed = async () => {
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
        // const url = "http://localhost:2003/product/test/new"; 
        const url = `http://localhost:2003/product/test/${location.state.id}`;

        const object = {
            "topicName": location.state.topic,
            "subtopicName": location.state.subtopic,
            "subtopic": location.state.id
        }
        // alert(JSON.stringify(object));
        const servermesg = await axios.get(url, object);
        if (servermesg.data.status === true) {
            setJson(servermesg.data.rec.test)
            // alert(JSON.stringify(servermesg.data));
            // const responseObject = JSON.parse(servermesg.data.response);
            // alert(JSON.stringify(responseObject));
            // console.log(responseObject);
            setObj2(
                {
                    topicName: location.state.topic,
                    subtopicName: location.state.subtopic,
                    subtopicId: location.state.id,
                    // testId:servermesg.data.response.testId
                    testId: servermesg.data.rec.test[0]._id
                }
            )
            // setObj(servermesg.data.questions); 
            // setObj(servermesg.data.rec.test[0].Questions);
        } else {
            alert(JSON.stringify(servermesg.data));
        }
    }

    return (
        <>
            <div>
                {/* {location.state.topic}
                {location.state.subtopic}*/}
                {JSON.stringify(testOptions)}
                <div className="m-4">
                    {showDropdown && (
                        // <select
                        //     value={selectedTest}
                        //     onChange={handleSelectTest}
                        //     className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        // >
                        //     <option value="" disabled>Select Test</option>
                        //     {testNumbers.map((testNumber) => (
                        //         <option key={testNumber} value={testNumber}>
                        //             Test {testNumber}
                        //         </option>
                        //     ))}
                        // </select>
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
                {/* {<div>
                    {obj.length > 0 ? <QuestionFormat data={obj} props={obj2} /> : <div>Loading...</div>}
                </div>} */}
            </div>
        </>
    )
}