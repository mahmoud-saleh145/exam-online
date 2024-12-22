import MemberInformation from "../MemberInformation/MemberInformation";
import Card from "./QuizCard/Card"
async function getData(props) {
    const res = await fetch('https://exam.elevateegy.com/api/v1/subjects', {
        method: 'GET',
        headers: {
            token: props
        }
    }
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function QuizList(props) {
    const userToken = await props.token.token
    const data = await getData(userToken)
    return (
        <>
            <div className="">
                <MemberInformation token={userToken} />
                <div className=" bg-white p-3 rounded-4 quizes-shadow">
                    <h6 className="main-color fs-4 fw-semibold mb-4">Quizes</h6>
                    <Card data={data.subjects} />
                </div>
            </div>
        </>
    )
}
