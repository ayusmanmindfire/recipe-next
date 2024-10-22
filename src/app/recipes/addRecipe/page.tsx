"use client"
//Native imports
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Third party imports
import axios from "axios";
import { useCookies } from "react-cookie";

//Static imports
import { RecipeForm } from "../../../components/RecipeForm";
import { recipesApi } from "../../../utils/apiPaths";
import eggCooking from "../../../../public/assets/eggCooking.jpg";

export default function AddRecipePag() {
    const [apiError, setApiError] = useState("");
    const navigate = useRouter();
    const [cookies] = useCookies(["user"] as any);
    const token = cookies.Authorization;

    const initialValues = {
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    };
    useEffect(()=>{
        if(!token)
            navigate.push('/auth/login')
    },[])

    const handleSubmit = async (values:any) => {
        try {
            const response = await axios.post(recipesApi.addNewRecipe, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setApiError("");
            navigate.push("/recipes");
        } catch (error:any) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <div className="container mx-auto py-5">
                <h2 className="text-2xl font-bold text-center font-Rubik">Add New Recipe</h2>
                <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={eggCooking.src} />
            </div>
        </>
    );
};
