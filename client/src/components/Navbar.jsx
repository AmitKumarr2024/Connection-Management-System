import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar bg-slate-200 py-3  w-full  sticky top-0 z-50">
      <ul className="flex justify-between px-9">
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <div className="flex justify-between gap-6">
          <li className="hover:scale-125">
            <Link
              to="/users"
              className={location.pathname === "/users" ? "active" : ""}
            >
              Users
            </Link>
          </li>

          <li className="hover:scale-125">
            <Link
              to="/offers"
              className={location.pathname === "/offers" ? "active" : ""}
            >
              Offers
            </Link>
          </li>

          <li className="hover:scale-125">
            <Link
              to="/needs"
              className={location.pathname === "/needs" ? "active" : ""}
            >
              Needs
            </Link>
          </li>

          <li className="hover:scale-125">
            <Link
              to="/projects"
              className={location.pathname === "/projects" ? "active" : ""}
            >
              Projects
            </Link>
          </li>

          <li className="hover:scale-125">
            <Link
              to="/connections"
              className={location.pathname === "/connections" ? "active" : ""}
            >
              Connections
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
