"use client"
//Native imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Third party imports
import axios from "axios";
import { useCookies } from "react-cookie";

//Static imports
import { RecipeCard } from "../../components/RecipeCard";
import { recipesApi } from "../../utils/apiPaths";

const apiUrl=process.env.API_URL;

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]); // State to hold the fetched recipes
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle any error
    const [cookies, setCookie] = useCookies(['user'] as any);
    const [query,setQuery]=useState("")
    const token = cookies.Authorization
    const navigate = useRouter();

    // Fetch recipes on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if (!token) {
                    navigate.push('/auth/login');
                    return
                }
                const response = await axios.get(recipesApi.getAllRecipes, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                setRecipes(response.data.data);
            } catch (error: any) {
                if (error.response && error.response.status === 401)
                    navigate.push('/auth/login')
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Conditional rendering based on loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        navigate.push('/error')
    }

    //function for handling search query
    const handleSearch=async()=>{
        try {
            const response=await axios.get(recipesApi.searchRecipes+query,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setRecipes(response.data.data)
        } catch (error) {
            navigate.push('/error')
        }
    }

    return (
        <>
            
            <div className="recipes-page p-4">
                <div className="flex justify-evenly gap-1  mb-3 h-10">
                    <div className="flex mb-3 h-10 gap-2">
                        <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search" className="px-5 w-full border rounded-lg focus:outline-none focus:border-primary" />
                        <button onClick={handleSearch} className="bg-contrastButton hover:bg-hoverContrastButton hover:text-white rounded-lg px-2 py-1 font-Rubik">Search</button>
                    </div>
                    <div>
                        <button className="hidden sm:flex bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 font-Rubik" onClick={()=>{
                            navigate.push('/recipes/addRecipe')
                        }}>Add recipe</button>
                        {/* Responsive button */}
                        <button className="sm:hidden bg-green-500 hover:bg-green-600 text-white rounded-2xl p-2 px-4 font-bold font-Rubik" onClick={()=>{
                            navigate.push('/recipes/addRecipe')
                        }}>+</button>
                    </div>

                </div>


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
                        <div>No recipes found</div>
                    )}
                </div>
            </div>
        </>
    );
};
