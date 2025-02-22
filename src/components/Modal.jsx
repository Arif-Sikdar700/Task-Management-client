import React, { useContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

export default function Modal({refetch}) {
  const axiosPublic = useAxiosPublic();
  const {users} = useContext(AuthContext)
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    axiosPublic
      .post("api/tasks", {
        title: task.title,
        description: task.description,
        category: task.category,
        email:users.email
      })
      .then((res) => {
        toast.success("Add Success");
        refetch()
      })
      .catch((err) => {
        toast.error(err.message);
      });
      
      setTask({ title: "", description: "", category: "" });
      document.getElementById("my_modal_5").close();
  };
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form className="" onSubmit={handleSubmit}>
          <div className="w-full flex justify-center gap-2 flex-col">
            <label className="label">
              <span className="font-bold text-black">Title </span>
            </label>
            <input
              value={task.title}
              onChange={(e) =>
                setTask((prv) => ({ ...prv, title: e.target.value }))
              }
              type="text"
              placeholder="Title"
              className="input font-medium text-black w-full input-bordered shadow-md  "
              required
              max={50}
            />
          </div>
          <div className="w-full mt-3 flex justify-center gap-2 flex-col">
            <label className="label">
              <span className="font-bold text-black">Description </span>
            </label>
            <textarea
              max={200}
              value={task.description}
              onChange={(e) =>
                setTask((prv) => ({ ...prv, description: e.target.value }))
              }
              placeholder="Description"
              className="textarea textarea-bordered textarea-xs w-full "></textarea>
          </div>
          <div className="w-full mt-3 flex justify-center gap-2 flex-col">
            <label className="label">
              <span className="font-bold text-black">Category </span>
            </label>

            <select
              className="select w-full select-bordered"
              value={task.category}
              onChange={(e) =>
                setTask((prv) => ({ ...prv, category: e.target.value }))
              }>
              <option disabled>Select Your Category</option>
              <option>To-Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
