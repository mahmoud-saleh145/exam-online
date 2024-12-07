'use client'
import Link from 'next/link';
import MainImg from '../../(components)/mainImg/MainImg';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { signIn } from 'next-auth/react';
import * as yup from "yup"
import { useFormik } from 'formik'
import NewPassword from '../newPassword/NewPassword';
import { useState } from 'react';


export default function VerifyCode(props: any) {



    const [data, setData] = useState('')
    let validationSchema = yup.object({
        resetCode: yup.string().required(),

    });



    const email = props.email
    async function resendCode(email: any) {
        const res = await fetch('https://exam.elevateegy.com/api/v1/auth/forgotPassword', {
            body: JSON.stringify(
                email
            ),
            headers: { "Content-Type": "application/json" },
            method: 'POST'
        })
        const result = await res.json()
        setData(result.message)
        console.log(result);
    }

    let formik = useFormik({
        initialValues: {
            resetCode: '',

        },
        validationSchema,
        onSubmit: async function (values) {
            const res = await fetch('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', {
                body: JSON.stringify(
                    values
                ),
                headers: { "Content-Type": "application/json" },
                method: 'POST'
            })
            const result = await res.json()
            console.log(result);
            setData(result.status)

        }


    });


    return (
        <>
            {data == 'Success' ? <NewPassword />
                : <div className='container-flued '>
                    <div className="row g-0">
                        <div className='col-md-6'>
                            <MainImg />
                        </div>
                        <div className='col-md-6 align-self-center'>
                            <div className="container">
                                <div className='d-flex gap-3 justify-content-end p-5 position-absolute end-0 top-0 m-3'>
                                    <span><p>English<IoMdArrowDropdown /></p></span>
                                    <span><Link href={'/login'} className='main-color  fw-bolder link-underline link-underline-opacity-0'>Sign in</Link></span>
                                    <span> <Link href={'/register'} className='link-underline link-underline-opacity-0 main-color border py-1 px-3 rounded-3 register-shadow '>Register</Link></span>
                                </div>
                                <div className="w-75 px-4 m-auto ">
                                    <h6 className='fs-5 fw-bolder'>Verify Code</h6>
                                    <form onSubmit={formik.handleSubmit} method="post">
                                        <div className="position-relative pb-4">
                                            <input
                                                autoComplete="off"
                                                value={formik.values.resetCode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                name='resetCode' type="text" className={`form-control input-shadow p-2  ${formik.touched.resetCode && formik.values.resetCode === '' || formik.errors.resetCode ? "border-danger" : ""}`} placeholder='Enter reset Code' ></input>
                                            {formik.errors.resetCode && formik.touched.resetCode && (<div className="alert alert-danger  py-0 position-absolute ">{formik.errors.resetCode}</div>)}
                                        </div>
                                        <div className="d-flex justify-content-end ">
                                            <div>Didn't receive a reset Code? <span onClick={() => { resendCode(email) }} className='main-color link-underline link-underline-opacity-0 mt-1 fw-semibold cursor-pointer '>Resend </span></div>
                                        </div>

                                        <button type='submit' className='btn btn-primary w-100 my-4 rounded-4 py-2 main-button ' >Verify</button>
                                    </form>
                                    <div className='continue-line d-flex justify-content-center '>
                                        <p className=''>Or Continue with</p>
                                    </div>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <div onClick={() => signIn("google", { callbackUrl: '/', redirect: true, })} className='fs-2 icons cursor-pointer'><FcGoogle /></div>
                                        <div onClick={() => signIn("facebook", { callbackUrl: '/', redirect: true, })} className='fs-2 icons facebook cursor-pointer'><FaFacebook /></div>
                                        <div className='fs-2 icons cursor-pointer'><FaTwitter /></div>
                                        <div className='fs-2 icons apple cursor-pointer'><FaApple /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

