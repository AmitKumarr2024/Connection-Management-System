import React from "react";  // Import React library for creating components
import { Link, useLocation } from "react-router-dom";  // Importing Link for navigation and useLocation to check the current route
import useDownloadReport from "../hooks/useDownloadReport";  // Importing custom hook for downloading reports

const Navbar = () => {
  const location = useLocation();  // Get the current route path
  const { downloadReport, loading, error } = useDownloadReport();  // Destructure download function, loading, and error from the custom hook

  return (
    // Navbar container with styling for background, padding, and sticky positioning
    <nav className="navbar bg-slate-200 py-3 w-full sticky top-0 z-50 shadow-md">
      <ul className="flex justify-between px-6 md:px-10 lg:px-12">
        <li>
          {/* Home link with an active class when the route is '/' */}
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        {/* Container for navigation links */}
        <div className="flex items-center gap-4 md:gap-6">
          <li className="hover:scale-110">
            {/* Link to '/users', adds 'active' class if on this route */}
            <Link
              to="/users"
              className={location.pathname === "/users" ? "active" : ""}
            >
              Users
            </Link>
          </li>
          <li className="hover:scale-110">
            {/* Link to '/offers', adds 'active' class if on this route */}
            <Link
              to="/offers"
              className={location.pathname === "/offers" ? "active" : ""}
            >
              Offers
            </Link>
          </li>
          <li className="hover:scale-110">
            {/* Link to '/needs', adds 'active' class if on this route */}
            <Link
              to="/needs"
              className={location.pathname === "/needs" ? "active" : ""}
            >
              Needs
            </Link>
          </li>
          <li className="hover:scale-110">
            {/* Link to '/projects', adds 'active' class if on this route */}
            <Link
              to="/projects"
              className={location.pathname === "/projects" ? "active" : ""}
            >
              Projects
            </Link>
          </li>
          <li className="hover:scale-110">
            {/* Link to '/connections', adds 'active' class if on this route */}
            <Link
              to="/connections"
              className={location.pathname === "/connections" ? "active" : ""}
            >
              Connections
            </Link>
          </li>

          {/* Button for downloading report */}
          <li>
            <button
              onClick={downloadReport}  // Calls the downloadReport function on click
              disabled={loading}  // Disable button if loading is true
              className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Downloading..." : "Download Report"}  {/* Shows "Downloading..." when loading, otherwise "Download Report" */}
            </button>
          </li>
        </div>
      </ul>

      {/* Displays error message if there is any error */}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </nav>
  );
};

export default Navbar;  // Export the Navbar component for use in other parts of the app
