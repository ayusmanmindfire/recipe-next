"use client"
// Native imports
import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";

// Third party imports
import { useCookies } from "react-cookie";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";

// Static imports
import { RatingModal } from "../../../components/RatingModal";
import { Ratings } from "../../../components/Ratings";
import { imagePaths } from "@/utils/imageImports";
import { recipeDetailsStrings } from "@/utils/constantStrings";
import { deleteRecipe, getRecipeDetails } from "@/services/recipes";
import { navRoutes } from "@/utils/navigationRoutes";
import { getRatingsOfARecipe } from "@/services/rating";
import LoadingSpinner from "@/components/Loader";

/*
 * RecipeDetails component for displaying individual recipe details
 * Fetches recipe and rating data based on the recipe ID, verifies user authorization, and allows the recipe creator to edit or delete the recipe
 * Enables users to view ingredients, steps, and provides options for rating the recipe
 */
export default function RecipeDetails(){
    //All states
    const [recipeDetails, setRecipeDetails] = useState({title:"",createdBy:"",image:"",ingredients:[],steps:""});
    const [ratings, setRatings] = useState(null); // State for rating management
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null); // State for storing user email
    const [openRating, setOpenRating] = useState(false); //state for handling rating form modal

    //All constants
    //Fetching user details from the redux store
    const userResponse= useSelector((state:any) => state.user.userDetails);
    const [cookies] = useCookies(['user']as any);
    const token = cookies.Authorization;
    const navigate = useRouter();
    const { id } = useParams();

    //Environments
    const apiUrl = process.env.API_URL;

    //Utility functions
    const handleOpen = () => setOpenRating(true);
    const handleClose = () => setOpenRating(false);
    // Function to delete recipe
    const handleDelete = async () => {
        try {
            await deleteRecipe(token,id)
            navigate.push(navRoutes.recipes);
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };
    //function to handle edit recipe
    const handleEdit = () => {
        navigate.push(`${navRoutes.recipes}/${id}${navRoutes.editRecipe}`);
    }

     // Fetch recipe details
     useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                if (!token||!userResponse) {
                    navigate.push(navRoutes.login);
                    return;
                }

                const recipeResponse = await getRecipeDetails(token,id)

                const ratingResponse = await getRatingsOfARecipe(token,id)
                setRecipeDetails(recipeResponse.data.data);
                setRatings(ratingResponse.data.data);
            } catch (error) {
                navigate.push(navRoutes.error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [token, id, navigate, openRating]);

    //Loader implementation
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="min-h-screen dark:bg-gray-800 transition-colors duration-200">
                <div className="container mx-auto dark:bg-gray-700 dark:text-white p-4 md:p-8">
                    {/* Recipe Details Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl md:text-3xl font-bold">{recipeDetails.title}</h1>

                        <div className="flex space-x-2">
                            {/* Star Button */}
                            <button
                                data-testid="rateButton"
                                onClick={handleOpen}
                                className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                            >
                                <img src={imagePaths.starIcon.src} alt="Rate Recipe" className="w-5" />
                            </button>

                            {/* Modal for rating form */}
                            <Modal
                                open={openRating}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                {/* Component for rating modal */}
                                <RatingModal recipeID={id} handleClose={handleClose} />
                            </Modal>

                            {userResponse.email === recipeDetails.createdBy && ( // Conditionally render buttons (which or only enabled for authors of the recipe)
                                <>
                                    {/* Edit Button */}
                                    <button
                                        data-testid="editButton"
                                        onClick={handleEdit}
                                        className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                                    >
                                        <img src={imagePaths.editIcon.src} alt="Edit Recipe" className="w-5" />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        data-testid="deleteButton"
                                        onClick={handleDelete}
                                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full"
                                    >
                                        <img src={imagePaths.deleteIcon.src} alt="Delete Recipe" className="w-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Recipe Image */}
                    <div className="mb-6">
                        <img
                            src={apiUrl + "/" + recipeDetails.image || "https://via.placeholder.com/300"}
                            alt={recipeDetails.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                    {/* Ingredients */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">{recipeDetailsStrings.ingredientsHeader}</h2>
                        <ul className="list-disc list-inside text-gray-700 mt-2 dark:text-white">
                            {recipeDetails.ingredients?.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Recipe Steps */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">{recipeDetailsStrings.steps}</h2>
                        <p className="text-gray-700 mt-2 wrap  dark:text-white">{recipeDetails.steps || "No steps provided."}</p>
                    </div>

                    {/* Ratings */}
                    <Ratings ratings={ratings} />
                </div>
            </div>
        </>
    );
};
