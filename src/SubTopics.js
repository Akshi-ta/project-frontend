import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SubTopics({ data }) {

    const navigate = useNavigate();
    const [flag , setFlag] = useState(0);

    // useEffect(()=>{
    //     navigate("/Learn" ,{state:{topic:data.topic}})
    // }, flag)

    const [obj , setObj] = useState(
        {
            name:"",
            topic:"",
            subtopic:""
        }
    )
    
    useEffect(() => {
        if (obj.topic && obj.subtopic) {
            if(obj.name === "learn")
                navigate("/Learn", { state: { topic: obj.topic, subtopic: obj.subtopic } });
            else if(obj.name === "test")
                navigate("/Test", { state: { topic: obj.topic, subtopic: obj.subtopic } });
        }
    }, [obj]);


    function SubTopicsCard({ subtopic }) {
        function onClickListener(event)
        {
            // alert(event.target.name)
            setObj(
                {
                    name:event.target.name,
                    topic: data.topic,
                    subtopic:subtopic["subtopic name"]
                }
            )
            
        }

        return (
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <h3 className="text-lg font-bold">{subtopic["subtopic number"]}</h3>
                <h3 className="text-lg font-bold">{subtopic["subtopic name"]}</h3>
                <p><strong>Duration:</strong> {subtopic.duration}</p>
                <div className="mt-4 flex justify-between">
                    <button name="learn" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onClickListener}>Learn</button>
                    <button name="test" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onClickListener}>Take Test</button>
                </div>
            </div>
        );
    }
    return (
        <>
        {JSON.stringify(obj)}
            <div className="my-8 mx-10">
                <h2 className="text-xl font-semibold mb-4">{data.topic}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.subtopics.map((subtopic, index) => (
                        <SubTopicsCard key={index} index ={index} subtopic={subtopic} />
                    ))}
                </div>
            </div>
        </>
    )
}