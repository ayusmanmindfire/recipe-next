"use client"
//Native imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Third party imports
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

//Static imports
import { RecipeCard } from "../../components/RecipeCard";
import { recipesPageStrings } from "@/utils/constantStrings";
import { navRoutes } from "@/utils/navigationRoutes";
import { getAllRecipe, searchRecipes } from "@/services/recipes";
import LoadingSpinner from "@/components/Loader";

//Environment variable
const apiUrl=process.env.API_URL;

/*
 * RecipesPage component for displaying all recipes
 * Fetches recipes from the API, handles search functionality, and displays a grid of RecipeCards
 * Allows users to add new recipes and search for specific recipes
 */
export default function RecipesPage() {
   //All states
   const [recipes, setRecipes] = useState([]); // State to hold the fetched recipes
   const [loading, setLoading] = useState(true); // State to handle loading state
   const [error, setError] = useState(null); // State to handle any error
   const [page, setPage] = useState(1);  // Track current page
   const [totalPages, setTotalPages] = useState(1); // Track total pages

   //All constants
   const [cookies, setCookie] = useCookies(['user']) as any;
   const [query,setQuery]=useState("")
   //Details fetching from redux store
   const userDetails = useSelector((state:any) => state.user.userDetails);
   const token = cookies.Authorization
   const navigate = useRouter();


    //Utility functions
    //function for handling search query
    const handleSearch=async()=>{
        try {
            const response=await searchRecipes(query,token);
            setRecipes(response.data.data)
        } catch (error) {
            navigate.push(navRoutes.error)
        }
    }

    //function for handling next page
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    //function for handling previous page
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Fetch recipes on component mount with pagination
    const fetchRecipes = async (page:any) => {
        try {
            if (!token || !userDetails) {
                navigate.push(navRoutes.login);
                return;
            }
            setLoading(true)
            const response = await getAllRecipe(token, page, 8);
            setRecipes(response.data.data.recipes);
            setTotalPages(response.data.data.pagination.totalPages);
        } catch (error:any) {
            if (error.response && error.response.status === 401) navigate.push(navRoutes.login);
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    //Use effects
    useEffect(() => {
        fetchRecipes(page);
    }, [page]);

    // Conditional rendering based on loading and error states
    if (loading) {
        return <LoadingSpinner/>
    }

    if (error) {
        navigate.push(navRoutes.error)
    }

    return (
        <>
            <div className="recipes-page dark:bg-gray-700 p-4 transition-colors duration-200">
                {/* Search field and add new recipe button */}
                <div className="flex justify-evenly gap-1  mb-3 h-10">
                    <div className="flex mb-3 h-10 gap-2">
                        <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search" className="px-5 w-full border rounded-lg focus:outline-none focus:border-primary" />
                        <button onClick={handleSearch} className="bg-contrastButton hover:bg-hoverContrastButton hover:text-white rounded-lg px-2 py-1 font-Rubik">{recipesPageStrings.searchButton}</button>
                    </div>
                    <div>
                        <button className="hidden sm:flex bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 font-Rubik" onClick={()=>{
                            navigate.push(navRoutes.addRecipe)
                        }}>{recipesPageStrings.addRecipeButton}</button>
                        {/* Responsive button */}
                        <button className="sm:hidden bg-green-500 hover:bg-green-600 text-white rounded-2xl p-2 px-4 font-bold font-Rubik" onClick={()=>{
                            navigate.push(navRoutes.addRecipe)
                        }}>{recipesPageStrings.addRecipeResponsive}</button>
                    </div>

                </div>

                {/* All recipes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recipes.length > 0 ? (
                        recipes.map((recipe:any) => (
                            <RecipeCard
                                key={recipe._id}
                                title={recipe.title}
                                ingredients={recipe.ingredients}
                                steps={recipe.steps}
                                // Constructing the full image URL
                                imageUrl={`${apiUrl}/${recipe.image}`}
                                id={recipe._id}
                            />
                        ))
                    ) : (
                        <div>{recipesPageStrings.noRecipes}</div>
                    )}
                </div>

                {/* pagination */}
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={handlePreviousPage} 
                        disabled={page === 1} 
                        className="px-4 py-2 mx-2 bg-primary hover:bg-hoverPrimary hover:text-black text-white rounded disabled:bg-gray-300 disabled:text-black"
                    >
                        {recipesPageStrings.previousPage}
                    </button>
                    <span className="mx-2">Page {page} of {totalPages}</span>
                    <button 
                        onClick={handleNextPage} 
                        disabled={page === totalPages} 
                        className="px-4 py-2 mx-2 bg-primary hover:bg-hoverPrimary hover:text-black text-white rounded disabled:bg-gray-300 disabled:text-black"
                    >
                        {recipesPageStrings.nextPage}
                    </button>
                </div>
            </div>
        </>
    );
};
