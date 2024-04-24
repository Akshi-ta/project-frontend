import React from 'react';

function QnaFormat({ data }) {

    return data.map(question => (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Your Message:</h3>
                        <p className="text-gray-700">{question.question}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Response:</h3>
                        <p className="text-gray-700">{question.responseByServer}</p>
                    </div>
                </div>
    ));
   
}

export default QnaFormat;
