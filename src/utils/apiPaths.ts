const apiUrl=process.env.API_URL;

export const userApi={
    registerUser:`${apiUrl}/user/register`,
    loginUser:`${apiUrl}/user/login`,
    verifyTokenUser:`${apiUrl}/user/verify`
}

export const recipesApi={
    getAllRecipes:`${apiUrl}/recipes`,
    addNewRecipe:`${apiUrl}/recipes`,
    getRecipeDetails:`${apiUrl}/recipes/`,
    updateRecipe:`${apiUrl}/recipes/`,
    deleteRecipes:`${apiUrl}/recipes/`,
    searchRecipes:`${apiUrl}/recipes/search?q=`
}

export const ratingsApi={
    getRatings:`${apiUrl}/ratings/`,
    addRatings:`${apiUrl}/ratings/`,

}
