import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import singup from "../assets/singup.json";
import "animate.css";
import { AuthContext } from "./../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function SingIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signIn,signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    signIn(user.email, user.password)
      .then((result) => {
        toast.success("Sucessfull Login");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setUser({ name: "", email: "", password: "" });
  };
  const handleGoogle = ()=>{
    signInWithGoogle()
    .then(result=>{
      console.log(result)
      toast.success("Login Sucessful")
      navigate("/")
    })
    .catch(err=>{
      toast.error(err.message)
    })
  }
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="md:w-1/2  md:h-3/4 rounded-md shadow-2xl border animate__animated animate__fadeInLeftBig ">
        <h1 className="text-center mt-5 text-[#3B25C1] font-bold text-3xl">
          Login
        </h1>
        <div className=" md:flex items-center ">
          <div>
            <Lottie className="max-w-96" animationData={singup}></Lottie>
          </div>
          <div>
            <form className="card-body" onSubmit={handleSubmit}>
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
              <div className="form-control ">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="divider"></div>
              <div className="form-control ">
                <button onClick={handleGoogle} type="button" className="btn btn-primary">Google Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
