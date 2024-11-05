"use client"
//Native imports
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Third party imports
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

//Static imports
import { profileStrings } from "@/utils/constantStrings";
import { imagePaths } from "@/utils/imageImports";
import { navRoutes } from "@/utils/navigationRoutes";
import LoadingSpinner from "@/components/Loader";
import { clearUserDetails } from "@/redux/userSlice";

/** Profile component to display user information after authentication
* Fetches user details based on a valid token and displays profile data
* Includes logout functionality to remove authorization token and redirect to login*/
export default function Profile(){
    //All states
    const [profileDetails, setProfileDetails] = useState({username:"",email:""});
    const [loading, setLoading] = useState(true); // State to handle loading state

    //All constants
    const [cookies, setCookie,removeCookie] = useCookies(['user'as any]);
    const token = cookies.Authorization
    const navigate = useRouter();
    const dispatch=useDispatch();
    //Details fetching from redux store
    const userDetails = useSelector((state:any) => state.user.userDetails);

    //Use effects
    //fetch user details using token verification
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!token||!userDetails) {
                    navigate.push(navRoutes.login)
                    return
                }
                //Setting the fetched data from redux store to current state
                setProfileDetails(userDetails);

            } catch (error) {
                navigate.push(navRoutes.error)
            } finally {
                setLoading(false);
            }
        }
        fetchUserData();
    }, []);


    if (loading) {
        return <LoadingSpinner/>;
    }
    return (
        <>
            {/* Main Container */}
            <div className="min-h-screen dark:bg-gray-700 bg-gray-100 py-10 px-6 flex flex-col items-center transition-colors duration-200">
                {/* Profile Card */}
                <div className="bg-white p-8 dark:bg-gray-900 dark:text-white rounded-lg shadow-md w-full max-w-md font-Rubik">
                    <h2 className="text-2xl font-semibold text-center mb-6">{profileStrings.profileHeader}</h2>
                    {/* User Details Section */}
                    <div className="space-y-4 ">
                        <div className="flex justify-between">
                            <span className="font-medium">{profileStrings.username}</span>
                            <span>{profileDetails?.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">{profileStrings.email}</span>
                            <span>{profileDetails?.email}</span>
                        </div>
                    </div>
                </div>
                {/* Profile Image Section (Optional) */}
                <div className="mt-8 flex flex-col gap-5 items-center">
                    <img
                        src={imagePaths.chef.src || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-56 h-32 rounded-full shadow-md object-cover"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-1 font-Rubik" onClick={() => {
                        removeCookie('Authorization');
                        dispatch(clearUserDetails());
                        navigate.push(navRoutes.login)
                    }}>{profileStrings.logout}</button>
                </div>
            </div>
        </>

    )
}