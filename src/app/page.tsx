import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { options } from "./api/auth/[...nextauth]/route";
import SideMenu from "./(components)/sideMenu/SideMenu";
import img from "./public/Frame 40.png"
import Image from "next/image"
import { CiSearch } from "react-icons/ci";
import QuizList from './(components)/QuizList/QuizList';
export default async function Home() {


  const session = await getServerSession(options);

  // console.log('token is here', session?.token);
  const userToken = session


  // console.log(session);

  return (
    <>
      <div className="container-flued p-3 bg-home ">
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
              <div className="col-md-2">
                <button className='btn text-white main-button py-2 w-100 fw-semibold rounded-4 '>Start Quiz</button>
              </div>
              <div className="col-md-1">
                <Image src={img} alt="main image" style={{ maxWidth: '47px', maxHeight: '47px' }} className="rounded-circle" />
              </div>
            </div>


            <QuizList token={userToken} />



          </div>
        </div>
      </div>
    </>
  );
}
