//Static imports
import { ratingStrings } from "@/utils/constantStrings";

/* Ratings component displays a list of ratings with a score, creator name, and optional feedback for each rating
* Accepts a ratings prop, which is an array of rating objects
* Each rating object includes: rating, createdBy, feedback
*/
export function Ratings({ ratings}:any){
    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-2">{ratingStrings.ratingCardHeader}</h2>
                {ratings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ratings.map((rating:any, index:string) => (
                            <div key={index} className="border p-4 rounded-lg shadow-sm bg-white">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold dark:text-black">{rating.rating}/5</span>
                                    <span className="text-gray-500 text-sm">by {rating.createdBy}</span>
                                </div>
                                <p className="text-gray-700 mt-2">{rating.feedback || "No feedback provided."}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">{ratingStrings.noRatings}</p>
                )}
            </div>
        </>
    )
}