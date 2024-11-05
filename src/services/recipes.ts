//Third party imports
import axios from "axios"

//Static imports
import { recipesApi } from "../utils/apiPaths"

//function for calling search api for recipes
export async function searchRecipes(query:string,token:string){
    try {
        const response=await axios.get(recipesApi.searchRecipes+query,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

//function for calling api for get all recipes
export async function getAllRecipe(token:string,page=1,limit:any){
    try {
        const queryForPage=`?page=${page}&limit=${limit}`
        const response = await axios.get(recipesApi.getAllRecipes+queryForPage, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return response
    } catch (error) {
        throw error
    }
}


//function for calling delete an recipe api
export async function deleteRecipe(token:string,id:any){
    try {
        await axios.delete(`${recipesApi.deleteRecipes}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
    } catch (error) {
        throw error
    }
}

//function for calling an api for getting details of an recipe
export async function getRecipeDetails(token:string,id:any){
    try {
        const recipeResponse = await axios.get(`${recipesApi.getRecipeDetails}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return recipeResponse
    } catch (error) {
        throw error
    }
}

//function for calling an api for adding a new recipe
export async function addRecipe(token:string,values:any){
    try {
        const response = await axios.post(recipesApi.addNewRecipe, values, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        throw error        
    }
}

//function for calling an api for editing a recipe
export async function editRecipe(token:string,values:any,id:any){
    try {
        const response = await axios.put(`${recipesApi.updateRecipe}${id}`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        throw error        
    }
}