import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import singup from "../assets/singup.json";
import "animate.css";
import { AuthContext } from "./../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function SingUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, users } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(user.email, user.password)
      .then((result) => {
        updateUserProfile(user.name)
          .then((result) => {
            axiosPublic
              .post(`users/${users?.email}`)
              .then((res) => {
                if (res.data.acknowledged) {
                  toast.success("Register Successful")
                }
              }).catch(err=>{
                toast.error(err.message)
              })
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setUser({ name: "", email: "", password: "" });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="md:w-1/2  md:h-3/4 rounded-md shadow-2xl border animate__animated animate__zoomIn ">
        <h1 className="text-center mt-5 text-[#3B25C1] font-bold text-3xl">
          Register
        </h1>
        <div className=" md:flex items-center ">
          <div>
            <Lottie className="max-w-96" animationData={singup}></Lottie>
          </div>
          <div>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  value={user.name}
                  onChange={(e) =>
                    setUser((prv) => ({ ...prv, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={user.email}
                  onChange={(e) =>
                    setUser((prv) => ({ ...prv, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={user.password}
                  onChange={(e) =>
                    setUser((prv) => ({ ...prv, password: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
