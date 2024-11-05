"use client"
//Native imports
import { useRouter } from "next/navigation";

//Static imports
import { landingPageStrings } from "@/utils/constantStrings";
import { CustomButton } from "@/components/CustomButton";
import { imagePaths } from "@/utils/imageImports";
import { navRoutes } from "@/utils/navigationRoutes";

/* 
 * LandingPage component for displaying the main introduction and call-to-action buttons
 * Provides navigation options to sign up or view recipes
 * Renders different images based on light or dark mode
 */
export default function Home() {
  //Instantiate router
  const router=useRouter()
  return (
    <>
        {/* landing page design */}
        <div className="relative grid grid-cols-1 md:grid-cols-2">
            {/* left container */}
            <div className="w-full p-10 flex justify-center items-center relative z-10">
                <div className="block">
                    <div className="font-bold text-4xl font-Rubik text-primary">
                        {landingPageStrings.homeHeader}
                    </div>
                    <div className="font-Rubik dark:text-white">
                       {landingPageStrings.homeText}
                    </div>
                    <div className="flex gap-2">
                        <CustomButton text="Sign UP" eventFunction={() => { router.push(navRoutes.signup) }} />
                        <CustomButton text="Go to recipes" eventFunction={() => { router.push(navRoutes.recipes) }} />
                    </div>
                </div>
            </div>

            {/* right container */}
            <div className="w-full h-screen">
                {/* Light mode image */}
                <img src={imagePaths.cooking.src} alt="cooking light" className="w-full h-full object-cover dark:hidden" />

                {/* Dark mode image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={imagePaths.darkCooking.src}
                        alt="cooking dark"
                        className="w-full h-full object-cover hidden dark:block filter"
                    />
                    {/* Dark overlay for additional effect */}
                    <div className="dark:absolute inset-0 bg-black opacity-60 "></div>
                </div>
            </div>
        </div>
    </>
);
}
