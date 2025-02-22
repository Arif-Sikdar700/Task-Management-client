import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { PiUsersFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
export default function Navbar() {
  const { users } = useContext(AuthContext);
  return (
    <div className="navbar bg-white md:px-12 flex-col md:flex-row sticky top-0 shadow-md drop-shadow-md">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Task Management
        </Link>
      </div>

      <div className="navbar-end flex flex-col md:flex-row md:gap-8">
        <div className="md:font-bold flex gap-2 items-center ">
          {" "}
          <PiUsersFill className="md:text-lg" />
          {users.displayName}
        </div>
        <div className="md:font-bold flex gap-2 items-center ">
          <MdEmail className="md:text-lg"/>
          {users.email}
        </div>
      </div>
    </div>
  );
}
