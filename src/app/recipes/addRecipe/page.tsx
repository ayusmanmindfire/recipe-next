"use client"
//Native imports
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Third party imports
import { useCookies } from "react-cookie";

//Static imports
import { RecipeForm } from "../../../components/RecipeForm";
import { imagePaths } from "@/utils/imageImports";
import { addRecipeStrings } from "@/utils/constantStrings";
import { navRoutes } from "@/utils/navigationRoutes";
import { addRecipe } from "@/services/recipes";

/* 
 * AddRecipePage component for creating a new recipe using RecipeForm component
 * Validates user authorization, provides a form for recipe details, and handles submission to the API
 * On successful submission, redirects to the recipes page
 */
export default function AddRecipePag() {
    //All states
    const [apiError, setApiError] = useState("");

    //All constants
    const navigate = useRouter();
    const [cookies] = useCookies(["user"] as any);
    const token = cookies.Authorization;
    const initialValues = {
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    };

    //Utility functions
    //Function for handling form submission
    const handleSubmit = async (values:any) => {
        try {
            const response = await addRecipe(token,values)
            setApiError("");
            navigate.push(navRoutes.recipes);
        } catch (error:any) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    //Use effects
    //For empty token navigate to login page
    useEffect(()=>{
        if(!token)
            navigate.push(navRoutes.login)
    },[])

    return (
        <>
            <div className="min-h-screen dark:bg-gray-800 dark:text-white h-full dark:h-screen">
            <div className="container mx-auto py-5">
                <h2 className="text-2xl font-bold text-center font-Rubik">{addRecipeStrings.addRecipe}</h2>
                <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={imagePaths.eggCooking.src} />
            </div>
            </div>
        </>
    );
};
