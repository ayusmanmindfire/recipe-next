"use client"
import { useParams } from "next/navigation";

export default function RecipeDetailPage(){
  const params = useParams();
  const recipeId = params.id; 
    return(
        <>
        {recipeId}
        </>
    )
}