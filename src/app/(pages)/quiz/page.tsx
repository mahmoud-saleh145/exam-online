import Image from "next/image";
import img from "../../public/Frame 40.png"
import SideMenu from "@/app/(components)/sideMenu/SideMenu";
import { CiSearch } from "react-icons/ci";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/route";
import ExamList from './../../(components)/examsList/ExamList';



export default async function quiz({ searchParams }: { searchParams: { id: string; } },) {
    const id = searchParams.id
    const session = await getServerSession(options);
    const userToken = session


    return (
        <>
            <div className="container-flued p-3  bg-home ">
                <div className="row ">
                    <div className="col-md-2 p-4">
                        <SideMenu />
                    </div>
                    <div className="col-md-10 p-4">
                        <div className="row align-items-center gx-3 mb-4">
                            <div className="col-md-9">
                                <div className="input-group align-items-center ">
                                    <span className="search-icon main-color border-0 px-3 pt-1 " ><CiSearch /></span>
                                    <input type="text" className="form-control search-shadow py-2  border-0" placeholder="Search Quiz" />
                                </div>
                            </div>
                            <div className="col-md-2 col-0">
                                <button className='btn text-white main-button py-2 w-100 fw-semibold rounded-4  '>Start Quiz</button>
                            </div>
                            <div className="col-md-1  ">
                                <Image src={img} alt="main image" style={{ maxWidth: '47px', maxHeight: '47px' }} className="rounded-circle" />
                            </div>
                        </div>
                        <ExamList token={userToken} id={id} />
                    </div>
                </div>
            </div>
        </>
    )

}

