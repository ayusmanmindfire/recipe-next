//Static imports
import { errorStrings } from "@/utils/constantStrings"
import { imagePaths } from "@/utils/imageImports"

/**
 * Static error page
 * it returns only an image with a string when it will face some network error
 */
export default function ErrorPage(){
    return(
        <>
            <div className="h-screen items-center gap-2 bg-[#d7e8f8] p-2 md:flex">
                {/* Image content */}
                <div >
                    <img src={imagePaths.errorImage.src} alt="Error image" className="md:h-screen"/>
                </div>
                {/* Specific error message */}
                <div className="font-Rubik text-5xl text-primary text-center">
                    {errorStrings.wentWrong}
                </div>
            </div>
        </>
    )
}