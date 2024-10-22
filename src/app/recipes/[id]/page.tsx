"use client"
// Native imports
import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";

// Third party imports
import { useCookies } from "react-cookie";
import { Modal } from "@mui/material";
import axios from "axios";

// Static imports
import { ratingsApi, recipesApi, userApi } from "../../../utils/apiPaths";
import deleteImage from "../../../../public/assets/delete.png";
import editImage from "../../../../public/assets/edit.png";
import starImage from "../../../../public/assets/star.png";
import { RatingModal } from "../../../components/RatingModal";
import { Ratings } from "../../../components/Ratings";

export default function RecipeDetails(){
    const apiUrl = process.env.API_URL;
    const [cookies] = useCookies(['user']as any);
    const [recipeDetails, setRecipeDetails] = useState({title:"",createdBy:"",image:"",ingredients:[],steps:""});
    const [ratings, setRatings] = useState(null); // State for rating management
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null); // State for storing user email
    const [openRating, setOpenRating] = useState(false); //state for handling rating form modal
    const handleOpen = () => setOpenRating(true);
    const handleClose = () => setOpenRating(false);

    const token = cookies.Authorization;
    const navigate = useRouter();
    const { id } = useParams();

    // Fetch user email using the token
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const userResponse = await axios.get(userApi.verifyTokenUser, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                setUserEmail(userResponse.data.data.email); // Set user email
            } catch (error) {
                navigate.push('/auth/login');
            }
        };
        verifyUser();
    }, [token, navigate]);

    // Fetch recipe details
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                if (!token) {
                    navigate.push('/auth/login');
                    return;
                }
                const recipeResponse = await axios.get(`${recipesApi.getRecipeDetails}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });

                const ratingResponse = await axios.get(`${ratingsApi.getRatings}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                setRecipeDetails(recipeResponse.data.data);
                setRatings(ratingResponse.data.data);
            } catch (error) {
                navigate.push('/error');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [token, id, navigate,openRating]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to delete recipe
    const handleDelete = async () => {
        try {
            await axios.delete(`${recipesApi.deleteRecipes}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in header
                },
            });
            navigate.push('/recipes');
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };

    //function to handle edit recipe
    const handleEdit = () => {
        navigate.push(`/recipes/${id}/editRecipe`);
    }

    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                {/* Recipe Details Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-3xl font-bold">{recipeDetails.title}</h1>

                    <div className="flex space-x-2">
                        {/* Star Button */}
                        <button
                            onClick={handleOpen}
                            className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                        >
                            <img src={starImage.src} alt="Rate Recipe" className="w-5" />
                        </button>

                        {/* Modal for rating form */}
                        <Modal
                            open={openRating}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            {/* Component for rating modal */}
                            <RatingModal recipeID={id} handleClose={handleClose}/> 
                        </Modal>

                        {userEmail === recipeDetails.createdBy && ( // Conditionally render buttons (which or only enabled for authors of the recipe)
                            <>
                                {/* Edit Button */}
                                <button
                                    onClick={handleEdit}
                                    className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                                >
                                    <img src={editImage.src} alt="Edit Recipe" className="w-5" />
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full"
                                >
                                    <img src={deleteImage.src} alt="Delete Recipe" className="w-5" />
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
                    <h2 className="text-2xl font-semibold">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        {recipeDetails.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                {/* Recipe Steps */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Steps</h2>
                    <p className="text-gray-700 mt-2 wrap">{recipeDetails.steps || "No steps provided."}</p>
                </div>               

                {/* Ratings */}
                <Ratings ratings={ratings}/>
            </div>
        </>
    );
};
