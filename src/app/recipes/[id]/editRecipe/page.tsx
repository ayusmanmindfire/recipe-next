"use client"
//Native imports
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

//Third party imports
import axios from "axios";
import { useCookies } from "react-cookie";

//Static imports
import { RecipeForm } from "../../../../components/RecipeForm";
import { recipesApi } from "../../../../utils/apiPaths";
import smokeImage from "../../../../../public/assets/smoke.jpg";

export default function EditRecipePage() {
    const [apiError, setApiError] = useState("");
    const [initialValues, setInitialValues] = useState({
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    });
    const { id } = useParams();
    const navigate = useRouter();
    const [cookies] = useCookies(["user"] as any);
    const token = cookies.Authorization;

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                if(!token){
                    navigate.push('/auth/login');
                    return
                }
                const response = await axios.get(`${recipesApi.getRecipeDetails}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const recipeData = response.data.data;
                setInitialValues({
                    title: recipeData.title,
                    steps: recipeData.steps,
                    image: recipeData.image,
                    ingredients: recipeData.ingredients,
                });
            } catch (error) {
                setApiError("Error fetching recipe details");
            }
        };

        fetchRecipeDetails();
    }, [id, token]);

    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.put(`${recipesApi.updateRecipe}${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setApiError("");
            navigate.push("/recipes");
        } catch (error: any) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold text-center font-Rubik mb-6">Edit Recipe</h2>
                <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={smokeImage.src}/>
            </div>
        </>
    );
};
