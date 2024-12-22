'use client'
import { useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

export default function ExamQuestions(props: any) {

    const questions = props.data.questions




    const [active, setActive] = useState(0)
    const [selected, setSelected] = useState([])
    const [answers, setAnswers] = useState([{}]);


    function next() {


        if (selected.length != 0) {

            setAnswers([...answers, selected])
            setSelected([])

        }
        console.log('answers', answers);

        if (active < 11) {
            setActive(active + 1)
        }

    }


    function handelAnswer(props: any) {
        setSelected(props)
    }



    function back() {
        if (active > 0) {
            setActive(active - 1)
            setSelected([])
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
                            <button className="btn main-button w-100 rounded-4 text-white mt-2" onClick={() => setActive(active + 1)} >Start</button>
                        </div>
                        : ''}
                    {questions.map((question: any, index: any) => (
                        <div className="" key={question._id}>
                            {active === index + 1 ?
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <small className="fw-semibold main-color">Question {index + 1} of 10</small>
                                        <span className="text-success mb-2"> <FcAlarmClock />14:59</span>
                                    </div>
                                    <p className="fs-6 mb-2 mt-4 fw-semibold">{question.question}</p>
                                    <div className="">

                                        <div className="row flex-column gy-3 gy-3 mx-1 mb-4 ">
                                            {question.answers.map((answer: any, i: any) => (
                                                <div className='answer-background p-3 rounded-3' key={answer.key}>
                                                    <input className="form-check-input me-2" type="radio" name="flexRadioDefault" id={`${answer.key}`} value={answer.key}
                                                        onChange={() => handelAnswer({ index, answer })} />
                                                    <label className="mb-0 fw-semibold" htmlFor={`${answer.key}`}>{answer.answer}</label>
                                                </div>

                                            ))}


                                        </div>
                                        <div className="d-flex gap-5">
                                            <button className="btn main-color  back-button w-100 rounded-4 mt-2 fw-semibold" type='submit' onClick={() => { back() }} >Back</button>
                                            <button className="btn main-button w-100 rounded-4 text-white mt-2 fw-semibold" disabled={selected.length == 0} type='submit' onClick={() => { next() }}>Next</button>
                                        </div>

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

