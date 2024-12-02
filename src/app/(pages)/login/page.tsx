'use client'
import Link from 'next/link';
import MainImg from './../../(components)/mainImg/MainImg';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik'




export default function login() {



    let validationSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: function (values) {
            let user = signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: "/",
            });
        },

    });

    return (
        <div className='container-flued '>
            <div className="row g-0">
                <div className='col-md-6 col-sm-12'>
                    <MainImg />
                </div>
                <div className='col-md-6 col-sm-12 align-self-center'>
                    <div className="container my-5">
                        <div className='d-flex gap-3 justify-content-end p-5 position-absolute end-0 top-0 m-3'>
                            <span><p>English<IoMdArrowDropdown /></p></span>
                            <span><Link href={'/login'} className='main-color  fw-bolder link-underline link-underline-opacity-0'>Sign in</Link></span>
                            <span> <Link href={'/register'} className='link-underline link-underline-opacity-0 main-color border py-1 px-3 rounded-3 register-shadow '>Register</Link></span>
                        </div>

                        <div className="w-75 px-4 m-auto ">
                            <h6 className='fs-5 fw-bolder'>Sign In</h6>
                            <form onSubmit={formik.handleSubmit} method="post" action="/api/auth/signin/email">

                                <input autoComplete="off"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} type="email" name='email' className={`form-control input-shadow p-2 my-3 ${formik.touched.email && formik.values.email == '' || formik.errors.email ? "border-danger" : ""}`} placeholder='Enter Email' />



                                <div className=" position-relative">
                                    <input autoComplete="off"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} type="password" name='password' className={`form-control input-shadow p-2 my-3 ${formik.touched.password && formik.values.password == '' || formik.errors.password ? "border-danger" : ''}`} placeholder='Enter Password' />

                                    <div className='position-absolute top-50 end-0 translate-middle show-password '><VscEye /></div>
                                </div>
                                <div className="d-flex justify-content-end ">
                                    <Link href={'/forgetPassword'} className='main-color link-underline link-underline-opacity-0 '>Recover password?</Link>
                                </div>
                                <button type='submit' className='btn btn-primary w-100 my-5 rounded-4 py-2 main-button ' >Sign in</button>
                            </form>
                            <div className='continue-line d-flex justify-content-center '>
                                <p className=''>Or Continue with</p>
                            </div>
                            <div className='d-flex justify-content-between mt-3 '>
                                <div onClick={() => signIn("google", { callbackUrl: '/', redirect: true, })} className='fs-2 icons cursor-pointer'><FcGoogle /></div>
                                <div onClick={() => signIn("facebook", { callbackUrl: '/', redirect: true, })} className='fs-2 icons facebook cursor-pointer'><FaFacebook /></div>
                                <div className='fs-2 icons cursor-pointer '><FaTwitter /></div>
                                <div className='fs-2 icons apple cursor-pointer'><FaApple /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

