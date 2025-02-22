import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
    let location = useLocation();
  const { users, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className=" w-72  loading loading-infinity "></div>
      </div>
    );
  }
  if (users) {
    return children;
  }
  return <Navigate to={"/singin"} state={{ from: location }} replace>PrivateRoute</Navigate>;
}
