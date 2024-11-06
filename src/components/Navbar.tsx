'use client'
//React imports
import React,{ useEffect, useState } from 'react';

//Third party imports
import { useDispatch, useSelector } from 'react-redux';

//Static imports
import { toggleTheme } from '../redux/themeSlice';
import { NavbarStrings } from '../utils/constantStrings';
import { useRouter } from 'next/navigation';


/**
 * Navbar component for navigating between app sections (Home, Recipes, Profile) and toggling theme.
 * Responsive design includes a burger menu for mobile view and a desktop menu for larger screens.
 * Uses `useEffect` to handle theme changes by adding/removing the "dark" class on the root element.
 */
export default function Navbar() {
    //All states
    const [isOpen, setIsOpen] = useState(false); // State to handle menu open/close

    //All constants
    const theme = useSelector((state:any) => state.theme.theme);
    const dispatch=useDispatch();
    const linkStyle = "hover:bg-secondary hover:text-primary dark:hover:text-darkPrimary text-white rounded p-1 font-Rubik";
    const router = useRouter();

    //Use effects
    // useEffect hook to handle theme changes based on the value of the theme prop
    useEffect(()=>{
        if(theme==="dark")
            document.documentElement.classList.add("dark");
        else
            document.documentElement.classList.remove("dark");
    },[theme]);

    return (
        <nav className="bg-primary dark:bg-darkPrimary p-3">
            <div className="flex justify-between items-center">
                <div className="text-white text-2xl font-bold font-Rubik ">
                    {NavbarStrings.logo}
                </div>
                
                {/* Burger Menu Icon for Mobile */}
                <div className="md:hidden">
                    <button
                        data-testid="menu"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                  <div className="hidden md:flex gap-3 items-center">
                  <button className={linkStyle} onClick={() => dispatch(toggleTheme())}>{theme}</button>
                    <button className={linkStyle} onClick={() => router.push("/")}>Home</button>
                    <button className={linkStyle} onClick={() => router.push("/recipes")}>Recipes</button>
                    <button className={linkStyle} onClick={() => router.push("/auth/profile")}>Profile</button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden mt-3 space-y-2">
                    <button className={`${linkStyle} w-full block text-left`} onClick={() => {
                        setIsOpen(false);
                        dispatch(toggleTheme())
                        }}>{theme}</button>
                    <button className={`${linkStyle} w-full block text-left`} onClick={() => { 
                        setIsOpen(false);
                        router.push("/"); }}>Home</button>
                    <button className={`${linkStyle} w-full block text-left`} onClick={() => { 
                        setIsOpen(false);
                        router.push("/recipes"); }}>Recipes</button>
                    <button className={`${linkStyle} w-full block text-left`} onClick={() => { 
                        setIsOpen(false);
                        router.push("/auth/profile"); }}>Profile</button>
                </div>
            )}
        </nav>
    );
}
