'use client'
import Link from 'next/link';
import MainImg from './../../(components)/mainImg/MainImg';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import * as yup from 'yup';
import { useFormik } from "formik";
import { signIn } from 'next-auth/react';
export default function register() {


    let validationSchema = yup.object({
        userName: yup.string().required().min(3).max(20),
        firstName: yup.string().required().min(3).max(20),
        lastName: yup.string().required().min(3).max(20),
        email: yup.string().email().required().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: yup.string().required().min(6),
        rePassword: yup.string().required().oneOf([yup.ref('password')]),
        phone: yup.string().required(),
    });



    let formik = useFormik({
        initialValues: {
            userName: "",
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

            if (result?.data.message == 'success') {
                let result = signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: true,
                    callbackUrl: "/",
                }
                )
            }


        }, validationSchema

        // onSubmit: async function (values) {
        //     let result = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", {
        //         userName: values.userName,
        //         firstName: values.firstName,
        //         lastName: values.lastName,
        //         email: values.email,
        //         password: values.password,
        //         rePassword: values.rePassword,
        //         phone: values.phone,
        //     }).then((result) => result)
        //         .catch((err) => {

        //             console.log(err);
        //         });
        //     console.log(result);



    });



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
                        <div className="w-75 px-4 m-auto ">
                            <h6 className='fs-5 fw-bolder'>Sign Up</h6>
                            <form onSubmit={formik.handleSubmit} method="post" >

                                <input autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.userName}
                                    onBlur={formik.handleBlur} name="userName" type="text" className={`form-control input-shadow p-2 my-3 ${formik.touched.userName && formik.values.userName == '' || formik.errors.userName ? "border-danger" : ""}`} placeholder='User Name' ></input>


                                <input autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    onBlur={formik.handleBlur} name="firstName" type="text" className={`form-control input-shadow p-2 my-3 ${formik.touched.firstName && formik.values.firstName == '' || formik.errors.firstName ? "border-danger" : ""}`} placeholder='First Name' ></input>
                                <input autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    onBlur={formik.handleBlur} type="text" name='lastName' className={`form-control input-shadow p-2 my-3 ${formik.touched.lastName && formik.values.lastName == '' || formik.errors.lastName ? "border-danger" : ""}`} placeholder='Last Name' ></input>
                                <input autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur} type="email" name='email' className={`form-control input-shadow p-2 my-3 ${formik.touched.email && formik.values.email == '' || formik.errors.email ? "border-danger" : ""}`} placeholder='Email' ></input>
                                <input autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    onBlur={formik.handleBlur} type="tel" name='phone' className={`form-control input-shadow p-2 my-3 ${formik.touched.phone && formik.values.phone == '' || formik.errors.phone ? "border-danger" : ""}`} placeholder='phone' ></input>
                                <div className=" position-relative">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur} type="password" name='password' className={`form-control input-shadow p-2 my-3 ${formik.touched.password && formik.values.password == '' || formik.errors.password ? "border-danger" : ""}`} placeholder='Enter Password' ></input>
                                    <div className='position-absolute top-50 end-0 translate-middle show-password '><VscEye /></div>
                                </div>
                                <div className=" position-relative">
                                    <input autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.rePassword}
                                        onBlur={formik.handleBlur} type="password" name='rePassword' className={`form-control input-shadow p-2 my-3 ${formik.touched.rePassword && formik.values.email == '' || formik.errors.email ? "border-danger" : ""}`} placeholder='Confirm Password' ></input>
                                    <div className='position-absolute top-50 end-0 translate-middle show-password'><VscEye /></div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <span className='link-underline link-underline-opacity-0 m-auto'>Already have an account? <Link href={'/login'} className='main-color link-underline link-underline-opacity-0 '>Login</Link></span>
                                </div>

                                <button type='submit' className='btn btn-primary w-100 my-5 rounded-4 py-2 main-button ' >Sign up</button>
                            </form>
                            <div className='continue-line d-flex justify-content-center '>
                                <p className=''>Or Continue with</p>
                            </div>
                            <div className='d-flex justify-content-between mt-3 '>
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
