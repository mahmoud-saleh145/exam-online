import Link from 'next/link';
import MainImg from './../../(components)/mainImg/MainImg';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import { signIn } from 'next-auth/react';
import * as yup from 'yup';
import { useFormik } from 'formik'
import axios from 'axios';

import { redirect } from 'next/navigation';
export default function newPassword() {




    let validationSchema = yup.object({
        email: yup.string().email().required(),
        newPassword: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: async function (values) {
            let result = await axios.put("https://exam.elevateegy.com/api/v1/auth/resetPassword", values)
                .catch((err) => {
                    console.log(err);
                })
            if (result) redirect('/login')

            console.log(result);


        }

    });





    return (

        <div className='container-flued '>
            <div className="row g-0">
                <div className='col-md-6'>
                    <MainImg />
                </div>
                <div className='col-md-6 align-self-center'>
                    <div className="container">
                        <div className='d-flex gap-3 justify-content-end p-5 position-absolute end-0 top-0 m-3'>
                            <span><p>English<IoMdArrowDropdown /></p></span>
                            <span><Link href={'/login'} className='main-color  fw-bolder link-underline link-underline-opacity-0'>Sign in</Link></span>
                            <span> <Link href={'/register'} className='link-underline link-underline-opacity-0 main-color border py-1 px-3 rounded-3 register-shadow'>Register</Link></span>
                        </div>

                        <div className="w-75 px-4 m-auto ">
                            <h6 className='fs-5 fw-bolder'>Set a Password</h6>
                            <form onSubmit={formik.handleSubmit} method="put" >
                                <div className=" position-relative">
                                    <input
                                        autoComplete="off"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name='email' type="email" className={`form-control input-shadow p-2 my-3 ${formik.touched.email && formik.values.email == '' || formik.errors.email ? "border-danger" : ""}`} placeholder='Create a Password' ></input>
                                    <div className='position-absolute top-50 end-0 translate-middle show-password '><VscEye /></div>
                                </div>
                                <div className=" position-relative">
                                    <input
                                        autoComplete="off"
                                        value={formik.values.newPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name='newPassword' type="password" className={`form-control input-shadow p-2 my-3 ${formik.touched.newPassword && formik.values.newPassword == '' || formik.errors.newPassword ? "border-danger" : ""}`} placeholder='Re-Enter Password' ></input>
                                    <div className='position-absolute top-50 end-0 translate-middle show-password'><VscEye /></div>
                                </div>
                                <button type='submit' className='btn btn-primary w-100 my-5 rounded-4 py-2 main-button ' >Sign in</button>
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
