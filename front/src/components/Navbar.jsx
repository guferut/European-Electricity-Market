import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();

  const activeStyles = {
    color: "white",
    fontWeight: "bold",
    borderBottom: "2px solid white",
    paddingBottom: "2px",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You have logged out");
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center text-xl text-white rounded-sm"></span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              className="text-xl text-gray-400 hover:text-white"
              activeStyle={activeStyles}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/entities"}
              className="text-xl text-gray-400 hover:text-white"
              activeStyle={activeStyles}
            >
              My Entities
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              className="text-xl text-gray-400 hover:text-white"
              activeStyle={activeStyles}
            >
              Add Entity
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>Log out</button>
        ) : (
          <Link to={"/login"}> Log in </Link>
        )}
      </div>
    </div>
  );
};
