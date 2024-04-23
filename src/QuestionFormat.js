import { React, useState } from 'react';
import { Done, Close } from '@mui/icons-material';
const QuestionFormat = ({ data }) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isTestSubmitted, setTestSubmitted] = useState(false);

    const handleOptionChange = (questionNumber, optionIndex) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [questionNumber]: optionIndex
        }));
    };


    const renderQuestions = () => {
        return data.Questions.map(question => (
            <div key={question["question number"]} className="mb-8 ml-10">
                <div className='flex'>
                    <h3 className="text-lg font-semibold mb-2">Question {question["question number"]}: {question.Question}</h3>
                    <div className='pl-2'>
                        {isTestSubmitted ?
                            (selectedOptions[question["question number"]] === question["correct option"] ?
                                <Done />
                                : <Close />)
                            : null
                        }
                    </div>
                </div>
                <ul className="list-none pl-0">
                    {question.options.map((option, index) => (
                        <li key={index} className="mb-2 flex items-center">
                            <input
                                disabled={isTestSubmitted}
                                type="radio"
                                id={`option_${question["question number"]}_${index}`}
                                name={`question_${question["question number"]}`}
                                value={index}
                                required
                                checked={selectedOptions[question["question number"]] === index}
                                onChange={() => handleOptionChange(question["question number"], index)}
                                className="mr-2"
                            />
                            <label htmlFor={`option_${question["question number"]}_${index}`}> {option}</label>
                        </li>
                    ))}
                </ul>
                {/* <p className="text-gray-700"><strong>Correct Option:</strong> Option {String.fromCharCode(97 + question["correct option"].charCodeAt() - 'a'.charCodeAt())}</p> */}
            </div>
        ));
    };

    const onSubmitTest = () => {
        setTestSubmitted(true);
    }

    const calculateResult = () => {
        let correctAnswers = 0;
        data.Questions.forEach(question => {
            if (selectedOptions[question["question number"]] === question["correct option"]) {
                correctAnswers++;
            }
        });
        if (correctAnswers >= 0.8 * data.Questions.length) {
            return 'You passed'

        }
        return 'You failed';
    }

    return (
        <>
            {JSON.stringify(selectedOptions)}

            <div >
                {data && (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center">{data.subtopic}</h2>
                        {renderQuestions()}
                    </>
                )}
            </div>
            <div>
                {/* {!isTestSubmitted? */}
                <button
                    disabled={isTestSubmitted}
                    onClick={() => onSubmitTest()}
                    type="submit"
                    className="flex w-1/6 mt-10 mx-auto mb-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {!isTestSubmitted ? "Submit Test" : calculateResult()}
                </button>
                {/* :null} */}
            </div>
        </>
    );
};

export default QuestionFormat;
