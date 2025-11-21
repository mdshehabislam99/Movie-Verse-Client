import React, { useEffect, useState } from "react";
import image from "../../assets/logo.avif";

const GlobalLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="flex justify-center items-center 
    bg-green-600 fixed inset-0 z-50">
      <img
        src={image}
        alt="loading"
        className="rounded-full w-25 h-25 animate-spin"
        style={{
          animationDuration: "2s",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  );
};

export default GlobalLoader;
