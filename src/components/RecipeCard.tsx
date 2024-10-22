"use client"
//Native imports
import { useRouter } from "next/navigation";

export function RecipeCard({ title, ingredients, steps, imageUrl,id }:any) {
    // Limit number of ingredients to display initially
    const displayedIngredients = ingredients?.slice(0, 2);
    const hasMoreIngredients = ingredients?.length > 2;
    const navigate=useRouter();

    return (
        <div className="card max-w-sm p-3 rounded-lg shadow-md bg-white flex flex-col justify-between border-gray-300">
            {/* Recipe Image */}
            <img
                src={imageUrl || "https://via.placeholder.com/150"}
                alt="Recipe"
                className="card-img w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Recipe Title */}
            <h2 className="text-xl font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                {title || "Untitled Recipe"}
            </h2>

            {/* Ingredients */}
            <div className="text-sm text-gray-600 mt-2">
                <h3 className="font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside max-h-20">
                    {displayedIngredients && displayedIngredients.length > 0 ? (
                        displayedIngredients.map((ingredient:[], index:string) => (
                            <li key={index} className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {ingredient}
                            </li>
                        ))
                    ) : (
                        <li>No ingredients provided</li>
                    )}
                </ul>
                {hasMoreIngredients && (
                    <span className="text-gray-400">
                        ...more
                    </span>
                )}
            </div>

            {/* Steps */}
            <div className="text-sm text-gray-600 mt-4">
                <h3 className="font-semibold">Steps:</h3>
                <div className="relative max-h-20 overflow-hidden line-clamp-2">
                    <p>{steps || "No steps provided"}</p>
                    {steps && steps.length > 100 && (
                        <span className="text-gray-400">
                            ...more
                        </span>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-contrastButton hover:bg-hoverContrastButton hover:text-white rounded-lg px-2 py-1 font-Rubik w-1/2" onClick={()=>{navigate.push(`/recipes/${id}`)}}>
                    Details
                </button>
            </div>
        </div>
    );
}
