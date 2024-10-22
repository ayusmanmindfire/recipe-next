"use client"
//Native imports
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

//Third-party imports
import axios from 'axios';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';

//Static imports
import { ratingsApi } from '../utils/apiPaths';


// Form validation
const validate = (values:any) => {
    const errors:any = {};

    if (!values.rating) {
        errors.rating = "Rating is required";
    } else if (values.rating > 5 || values.rating < 1) {
        errors.rating = "Rating should be in the range of 1-5";
    }

    if (!values.feedback) {
        errors.feedback = "Feedback is required";
    }

    return errors;
};

export function RatingModal({ recipeID, handleClose }:any) {
    const [cookies] = useCookies(["user"] as any);
    const token = cookies.Authorization;
    const [apiError, setApiError] = useState("")
    const navigate = useRouter();
    useEffect(() => {
        if (!token) {
            navigate.push('/auth/login')
        }
    })
    const formik = useFormik({
        initialValues: {
            rating: null,
            feedback: ""
        },
        validate,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(ratingsApi.addRatings + recipeID, values, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                handleClose();

            } catch (error:any) {
                if (error.response)
                    setApiError(error.response.data.message);
                else
                    navigate.push('/error')
            }

        }
    });

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded shadow-lg w-[80%] md:w-[40%]">
            <h2 className="text-lg font-bold mb-4">Rate this Recipe</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Rating (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="rating"
                        value={formik.values.rating as any}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {/* Error handling */}
                    {formik.errors.rating && (
                        <div className="text-red-600 mt-1">{formik.errors.rating}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Feedback:</label>
                    <textarea
                        name="feedback"
                        value={formik.values.feedback}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={4}
                        placeholder="Leave your feedback here"
                    />
                    {/* Error handling */}
                    {formik.errors.feedback && (
                        <div className="text-red-600">{formik.errors.feedback}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 "
                >
                    Submit
                </button>

                <button
                    onClick={handleClose}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mx-5"
                >
                    Cancel
                </button>

                {/* API Error Message */}
                {apiError && (
                    <div className="text-red-600 mt-4 text-center">{apiError}</div>
                )}
            </form>
        </div>
    );
};
