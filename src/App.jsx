import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./components/Siderbar";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";

// Add a Loading Component
export const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="spinner-border animate-spin w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full"></div>
  </div>
);

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  useEffect(() => {
    // Simulate loading time (this is where you could check login or fetch data)
    setTimeout(() => {
      if (userData) {
        dispatch(setUser(userData)); // Dispatch user data to Redux
      }
      setLoading(false); // Set loading to false after checking
    }, 500); // Simulate a 1-second delay (you can adjust this as needed)
  }, [dispatch, userData]);

  // If loading, show the Loading spinner
  // if (loading) {
  //   return <Loading />;
  // }

  // If userData is not present, redirect to login
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-6 bg-[whitesmoke] transition-all duration-300 ${
          isOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
