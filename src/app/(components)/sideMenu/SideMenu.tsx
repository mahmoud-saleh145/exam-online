'use client'
import img from '../../public/Final Logo 1.png'
import Image from "next/image"
import { MdSpaceDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

import { signOut, useSession, } from 'next-auth/react';
import axios from 'axios';


export default function SideMenu() {

    const { data } = useSession()
    const userToken = data?.token

    let headers = {
        token: userToken
    }


    async function logOut() {
        const res = await axios.get('https://exam.elevateegy.com/api/v1/auth/logout',
            {
                headers
            }
        )
        console.log(res.data);

        if (res?.data.message == 'success') {
            signOut()
        }
    }

    return (
        <div className='row flex-column gy-3 '>
            <div >
                <Image src={img} alt="main image" />
            </div>
            <div className="">
                <button className='btn text-white main-button py-1 fw-semibold '> <span className=' me-3'><MdSpaceDashboard /></span> DashBoard</button>
                <button className='btn  my-3 fw-semibold second-color ' ><span className='main-color me-3'><FaHistory /></span> Quiz History</button>
            </div>
            <div className="">
                <button className='btn fw-semibold second-color logOutButton' onClick={logOut} ><span className='main-color me-3 logoutIcon'><RiLogoutBoxFill /></span> Log Out</button>
            </div>
        </div>
    )

}
