
'use client'
import { useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

export default function ExamQuestions(props: any) {

    const questions = props.data.questions
    console.log(questions);
    const [active, setActive] = useState(0)



    function next() {
        if (active < 11) {

            setActive(active + 1)
        }
    }
    function back() {
        if (active > 0) {
            setActive(active - 1)
        }

    }




    return (
        <>
            <div className="ExamQuestions-layout w-100 h-100 d-flex justify-content-center align-items-center position-absolute top-0 start-0 ">
                <div className="question-layout bg-white rounded-4 p-3">
                    {active === 0 ?
                        <div className="">
                            <p>instructions</p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                                <li>Lorem ipsum dolor sit amet consectetur</li>
                            </ul>
                            <button className="btn main-button w-100 rounded-4 text-white mt-2" onClick={next} >Start</button>
                        </div>
                        : ''}


                    {questions.map((question: any, i: any) => (
                        <div className="" key={question._id}>


                            {active === i + 1 ?
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <small className="fw-semibold main-color">Question {i + 1} of 10</small>
                                        <span className="text-success mb-2"> <FcAlarmClock />14:59</span>
                                    </div>
                                    <p className="fs-6 mb-2 mt-4 fw-semibold">{question.question}</p>
                                    <div className="row flex-column gy-3 gy-3 mx-1 mb-4 ">
                                        {question.answers.map((answer: any) => (


                                            <div className='answer-background p-3 rounded-3' key={answer.key}>
                                                <input className="form-check-input me-2" type="radio" name="flexRadioDefault" id={`${answer.key}`} value={answer.key} />
                                                <label className="mb-0 fw-semibold" htmlFor={`${answer.key}`}>{answer.answer}</label>

                                            </div>

                                        ))}
                                    </div>
                                    <div className="d-flex gap-5">
                                        <button className="btn main-color  back-button w-100 rounded-4  mt-2  fw-semibold" onClick={back} >Back</button>
                                        <button className="btn main-button w-100 rounded-4 text-white mt-2 fw-semibold" onClick={next}>Next</button>
                                    </div>
                                </div>
                                :
                                ''
                            }
                        </div>
                    ))}
                    {active === 11 ?
                        <div className="">
                            <p>Your score</p>

                            <button className="btn main-button w-100 rounded-4 text-white mt-2  fw-semibold" onClick={back} >Back</button>
                            <button className="btn main-button w-100 rounded-4 text-white mt-2 fw-semibold" onClick={back} >Show details</button>
                        </div>
                        : ''}



                </div>
            </div>
        </>
    )
}

