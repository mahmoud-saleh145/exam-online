'use client'
import Link from 'next/link';
import MainImg from '../../(components)/mainImg/MainImg';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


export default function register() {

    const router = useRouter();

    let validationSchema = yup.object({
        username: yup.string().required().min(3).max(20),
        firstName: yup.string().required().min(3).max(20),
        lastName: yup.string().required().min(3).max(20),
        email: yup.string().email().required().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: yup.string().required().min(6),
        rePassword: yup.string().required().oneOf([yup.ref('password')]),
        phone: yup.string().required(),
    });



    let formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        onSubmit: async function (values) {
            const res = await fetch('https://exam.elevateegy.com/api/v1/auth/signup', {
                body: JSON.stringify(
                    values
                ),
                headers: { "Content-Type": "application/json" },
                method: 'POST'
            })
            const result = await res.json()
            console.log(result);
            if (result?.message == 'success') {
                router.push('/login')
            }
        }, validationSchema


    });


    let [show, setShow] = useState(false)
    const showPassword = () => {
        setShow(!show)
    }


    return (
        <div className='container-flued'>
            <div className="row g-0">
                <div className='col-md-6'>
                    <MainImg />
                </div>
                <div className='col-md-6 align-self-center'>
                    <div className="container my-5">
                        <div className='d-flex gap-3 justify-content-end p-5 position-absolute end-0 top-0 m-3'>
                            <span><p>English<IoMdArrowDropdown /></p></span>
                            <span><Link href={'/login'} className='main-color  fw-bolder link-underline link-underline-opacity-0'>Sign in</Link></span>
                            <span> <Link href={'/register'} className='link-underline link-underline-opacity-0 main-color border py-1 px-3 rounded-3 register-shadow'>Register</Link></span>
                        </div>
                        <div className="w-75 px-4 m-auto pt-4">
                            <h6 className='fs-5 fw-bolder mb-3'>Sign Up</h6>
                            <form className="row flex-column gy-4" onSubmit={formik.handleSubmit} method="post" >


                                <div className="position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        onBlur={formik.handleBlur} type="text" name="username" className={`form-control input-shadow p-2  ${formik.touched.username && formik.values.username == '' ? "border-danger" : ""}`} placeholder='User Name' ></input>
                                    {formik.errors.username && formik.touched.username && (<div className="alert alert-danger  py-0 position-absolute ">{formik.errors.username}</div>)}
                                </div>


                                <div className="position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        onBlur={formik.handleBlur} type="text" name="firstName" className={`form-control input-shadow p-2  ${formik.touched.firstName && formik.values.firstName == '' ? "border-danger" : ""}`} placeholder='First Name' ></input>
                                    {formik.errors.firstName && formik.touched.firstName && (<div className="alert alert-danger   py-0 position-absolute ">{formik.errors.firstName}</div>)}
                                </div>


                                <div className="position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        onBlur={formik.handleBlur} type="text" name='lastName' className={`form-control input-shadow p-2  ${formik.touched.lastName && formik.values.lastName == '' ? "border-danger" : ""}`} placeholder='Last Name' ></input>
                                    {formik.errors.lastName && formik.touched.lastName && (<div className="alert alert-danger   py-0 position-absolute ">{formik.errors.lastName}</div>)}
                                </div>


                                <div className="position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur} type="email" name='email' className={`form-control input-shadow p-2  ${formik.touched.email && formik.values.email == '' ? "border-danger" : ""}`} placeholder='Email' ></input>
                                    {formik.errors.email && formik.touched.email && (<div className="alert alert-danger   py-0 position-absolute ">{formik.errors.email}</div>)}
                                </div>


                                <div className="position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        onBlur={formik.handleBlur} type="tel" name='phone' className={`form-control input-shadow p-2  ${formik.touched.phone && formik.values.phone == '' ? "border-danger" : ""}`} placeholder='phone' ></input>
                                    {formik.errors.phone && formik.touched.phone && (<div className="alert alert-danger   py-0 position-absolute ">{formik.errors.phone}</div>)}
                                </div>



                                <div className=" position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur} type={show ? "" : "password"} name='password' className={`form-control input-shadow p-2  ${formik.touched.password && formik.values.password == '' ? "border-danger" : ""}`} placeholder='Enter Password' ></input>
                                    <div className='position-absolute top-50 end-0 translate-middle show-password cursor-pointer pe-2 pb-1' onClick={showPassword}><VscEye /></div>
                                    {formik.errors.password && formik.touched.password && (<div className="alert alert-danger   py-0 position-absolute ">{formik.errors.password}</div>)}
                                </div>


                                <div className=" position-relative pb-2">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.rePassword}
                                        onBlur={formik.handleBlur} type={show ? "" : "password"} name='rePassword' className={`form-control input-shadow p-2  ${formik.touched.rePassword && formik.values.rePassword == '' ? "border-danger" : ""}`} placeholder='Confirm Password' ></input>
                                    <div className='position-absolute top-50 end-0 translate-middle show-password cursor-pointer pe-2 pb-1 ' onClick={showPassword}><VscEye /></div>
                                    {formik.errors.rePassword && formik.touched.rePassword && (<div className="alert alert-danger   py-0 position-absolute ">{formik.errors.rePassword}</div>)}
                                </div>


                                <div className="d-flex justify-content-end">
                                    <span className='link-underline link-underline-opacity-0 m-auto mb-2'>Already have an account? <Link href={'/login'} className='main-color link-underline link-underline-opacity-0 '>Login</Link></span>
                                </div>
                                <button type='submit' className='btn btn-primary w-100 my-4 rounded-4 py-2 main-button ' >Sign up</button>
                            </form>
                            <div className='continue-line d-flex justify-content-center '>
                                <p className=''>Or Continue with</p>
                            </div>
                            <div className='d-flex justify-content-between my-3 '>
                                <div onClick={() => signIn("google", { callbackUrl: '/', redirect: true, })} className='fs-2 icons'><FcGoogle /></div>
                                <div onClick={() => signIn("facebook", { callbackUrl: '/', redirect: true, })} className='fs-2 icons facebook'><FaFacebook /></div>
                                <div className='fs-2 icons'><FaTwitter /></div>
                                <div className='fs-2 icons apple'><FaApple /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
