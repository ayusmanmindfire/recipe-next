'use client';
//Native imports
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

//Static imports
import LoadingSpinner from "@/components/Loader"; // Ensure this path is correct

const ClientLoader = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Loader will respond once url changed, and this is configured in the layout
  //As a result it will be affected globally for all routes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Adjust as needed

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading && <LoadingSpinner />} {/* Show spinner when loading */}
      {children} {/* Render children */}
    </>
  );
};

export default ClientLoader;
