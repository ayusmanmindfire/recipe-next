"use client"
//Native imports
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

//Third party imports
import { useCookies } from "react-cookie";

//Static imports
import { RecipeForm } from "../../../../components/RecipeForm";
import { editRecipe, getRecipeDetails } from "@/services/recipes";
import { navRoutes } from "@/utils/navigationRoutes";
import { imagePaths } from "@/utils/imageImports";
import { editRecipeStrings } from "@/utils/constantStrings";
import { useSelector } from "react-redux";

/*
 * EditRecipePage component for editing an existing recipe using recipeForm component
 * Retrieves recipe details based on recipe ID, pre-populates form with existing data, and handles updates to the API
 * On successful edit, redirects to the recipes page
 */
export default function EditRecipePage() {
    //All states
    const [apiError, setApiError] = useState("");
    const [initialValues, setInitialValues] = useState({
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    });

    //All constants
    //Fetching user details from the redux store
    const userResponse= useSelector((state:any) => state.user.userDetails);
    const { id } = useParams();
    const navigate = useRouter();
    const [cookies] = useCookies(["user"] as any);
    const token = cookies.Authorization;

    //Utility functions
    //Function to handle submission of form
    const handleSubmit = async (values:any) => {
        try {
            const response = await editRecipe(token,values,id)
            setApiError("");
            navigate.push(navRoutes.recipes);
        } catch (error:any) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    //Use effects
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                //For empty token redirect to login page
                if (!token) {
                    navigate.push(navRoutes.login);
                    return
                }
                const response = await getRecipeDetails(token,id)
                const recipeData = response.data.data;
                //Re-populate input fields
                setInitialValues({
                    title: recipeData.title,
                    steps: recipeData.steps,
                    image: recipeData.image,
                    ingredients: recipeData.ingredients,
                });
                //Preventing unauthorized user for editing a recipe
                if(userResponse.email!=recipeData.createdBy)
                    navigate.push(navRoutes.error)
            } catch (error) {
                setApiError("Error fetching recipe details");
            }
        };

        fetchRecipeDetails();
    }, [id, token]);

    return (
        <>
            <div className="dark:bg-gray-800 dark:text-white min-h-screen">
                <div className="container mx-auto p-8 ">
                    <h2 className="text-2xl font-bold text-center font-Rubik mb-6">{editRecipeStrings.editRecipe}</h2>
                    <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={imagePaths.smoke.src} />
                </div>
            </div>
        </>
    );
};
