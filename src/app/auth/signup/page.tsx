"use client"

//Native imports
import React, { useState } from "react";
import { useRouter } from "next/navigation";

//Third party imports
import { useFormik } from "formik";

//Static imports
import { signUpStrings } from "@/utils/constantStrings";
import { navRoutes } from "@/utils/navigationRoutes";
import { registerUser } from "@/services/auth";

//Form validation
const validate = (values:any) => {
    const errors:any = {}; //object of errors for specific fields
    if (!values.username) {
        errors.username = "Username cannot be empty";
    } else if (values.username.length > 40 || values.username.length < 3) {
        errors.username = "Must be between 3 to 40 characters";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (!/^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,30}$/.test(values.password)) {
        errors.password = "Password should be 8-30 characters and contain at least one special character";
    }

    return errors;
};

/**
* SignUp component for handling new user registration
* Renders a form for users to enter registration details
* Submits data to the API and navigates to login upon successful registration */
export default function SignUp(){
    //All states
    const [apiError, setApiError] = useState(""); // State to store API error messages

    //All constants
    const navigate = useRouter();
    //Interaction with form using formik
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                //POST api call with values as the payload
                const response = await registerUser(values);
                // console.log("Registration successful:", response.data);
                setApiError("");
                navigate.push(navRoutes.login); //On successful registration navigate to login
            } catch (error:any) {
                if (error.response) {
                    // API error response
                    setApiError("Email already exists");
                } else {
                    // Network or other errors
                    setApiError("Network error. Please try again later.");
                }
            }
        },
    });

    return (
        <>
            <div className="dark:bg-gray-600 dark:h-screen section-container grid grid-cols-1 items-center gap-10 md:h-screen md:grid-cols-2 p-10 font-Rubik bg-gray-100">
                
                {/* Form Container */}
                <div className="form-container w-full bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
                    <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">{signUpStrings.signUpHeader}</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* username field*/}
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.username && (
                                <div className="text-red-600 mt-1">{formik.errors.username}</div>
                            )}
                        </div>
                        
                        {/* email field */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.email && (
                                <div className="text-red-600 mt-1">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* password field */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.password && (
                                <div className="text-red-600 mt-1">{formik.errors.password}</div>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-hoverPrimary text-white py-3 rounded-lg font-semibold">
                            {signUpStrings.registerButton}
                        </button>

                        {/* API Error Message */}
                        {apiError && (
                            <div className="text-red-600 mt-4 text-center">
                                {apiError}
                            </div>
                        )}
                    </form>
                </div>

                {/*Login option */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-lg dark:text-white">{signUpStrings.haveAnAccount}</p>
                    <button
                        className="bg-primary hover:bg-hoverPrimary text-white py-3 px-6 rounded-lg font-semibold"
                        onClick={() => navigate.push(navRoutes.login)}
                    >
                        {signUpStrings.loginButton}
                    </button>
                </div>
            </div>
        </>
    );
};
