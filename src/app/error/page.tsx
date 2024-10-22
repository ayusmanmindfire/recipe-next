//Static imports
import errorImage from "../../../public/assets/errorImage.jpg"

export default function ErrorPage(){
    return(
        <>
            <div className="h-screen items-center gap-2 bg-[#d7e8f8] p-2 md:flex">
                {/* Image content */}
                <div >
                    <img src={errorImage.src} alt="" className="md:h-screen"/>
                </div>
                {/* Specific error message */}
                <div className="font-Rubik text-5xl text-primary text-center">
                    Something went wrong
                </div>
            </div>
        </>
    )
}