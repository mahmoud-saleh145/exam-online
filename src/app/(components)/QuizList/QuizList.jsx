'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import Quiz from "../Quiz/Quiz"
import { Grid } from 'react-virtualized';

export default function QuizList(props) {
    const userToken = props.token.token
    const [data, setData] = useState([])
    const [exam, setExam] = useState([])

    const CARD_WIDTH = 370; // Card width
    const CARD_HEIGHT = 500; // Card height
    const COLUMN_COUNT = 3; // Cards per row
    async function getQuiz() {
        const userToken = await props.token.token
        // console.log(userToken)
        let headers = {
            token: userToken
        }
        const res = await axios.get('https://exam.elevateegy.com/api/v1/subjects',
            {
                headers
            },
        ).then((response) => response)
            .catch((err) => err)
        setData(res.data.subjects)
        // console.log(res.data.subjects)
    }



    async function getExams(id) {
        const userToken = await props.token.token
        let headers = {
            token: userToken
        }

        const res = await axios.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`,
            { headers },

        ).then((response) => response)
            .catch((err) => err)
        setExam(res.data)

        // console.log(res.data);
    }

    const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
        const index = rowIndex * COLUMN_COUNT + columnIndex;
        if (index >= data.length) return null;

        return (
            <div key={key} style={{ ...style, padding: "10px" }}>


                <div key={data._id} className="position-relative cursor-pointer" onClick={() => { getExams(data[index]._id) }} >
                    <img src={data[index].icon} className="w-100"></img>
                    <h5 className="position-absolute title w-75 text-white p-4">{data[index].name}</h5>
                </div>


            </div>

        );
    };





    useEffect(() => {
        getQuiz()
    }, [])

    return (
        <>
            {exam.message !== "success" ?
                <div className="me-5 bg-white p-3 rounded-4 quizes-shadow">
                    <h6 className="main-color fs-4 fw-semibold mb-4">Quizes</h6>

                    <div className="row gy-4 pb-3">


                        {data.length > 0 ? (

                            <Grid

                                cellRenderer={cellRenderer}
                                columnCount={COLUMN_COUNT}
                                columnWidth={CARD_WIDTH}
                                height={330} // Two rows visible
                                rowCount={2}
                                rowHeight={340}
                                width={1150} // Three cards per row
                            />


                        ) : (
                            <h2>Loading...</h2>
                        )}






                    </div>
                </div>
                :

                <Quiz exam={exam} token={userToken} />
            }

        </>
    )
}
