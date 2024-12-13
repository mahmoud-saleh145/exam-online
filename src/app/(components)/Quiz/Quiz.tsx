'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import ExamQuestions from "../ExamQuestions/ExamQuestions"

export default function Quiz(props: any) {
    const exams = props.exam
    const token = props.token

    const [questionsMessage, setQuestionsMessage] = useState('')
    const [questionsData, setQuestionsData] = useState([])
    async function getExamQuestions(id: any) {
        const userToken = await token
        let headers = {
            token: userToken
        }
        const res = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
            { headers },

        ).then((response) => response)
            .catch((err) => err)
        console.log(res.data);

        setQuestionsMessage(res.data.message)
        setQuestionsData(res.data)


    }
    // if (questionsMessage == 'success') {
    //     return (
    //         <ExamQuestions data={questionsData} />
    //     )
    // }



    return (
        <>
            {questionsMessage !== 'success' ?
                <div className="row  ">
                    {exams.exams.map((exam: any) => (
                        <div key={exam._id}>
                            <p className=" fs-6 fw-semibold">{exam.title}</p>
                            <div className="col-md-12 me-5 bg-white p-4 rounded-4 quizes-shadow d-flex justify-content-between mb-3">
                                <div>
                                    <div >
                                        <h5 className="">{exam.title.split(' ').slice(0, 1).join(' ')}</h5>
                                        <p className="question-font ">{exam.numberOfQuestions} Questions</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="mb-1">{exam.duration} Minutes</p>
                                        <button className='btn text-white main-button py-0 px-4 rounded-4' onClick={() => { getExamQuestions(exam._id) }}>Start</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <ExamQuestions data={questionsData} />

            }
        </>
    )
}
