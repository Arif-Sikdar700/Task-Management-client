import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "../components/TaskItem";

export default function Home() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { logOut, users } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["tasks", users.email],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`api/tasks/${users.email}`);
        setTasks(res.data);
        return res.data;
      } catch (error) {}
    },
  });

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTask = () => {
    if (!users.email) {
      navigate("/");
    }
    document.getElementById("my_modal_5").showModal();
  };

  const categories = ["To-Do", "In Progress", "Done"];
  const categorizedTasks = (category) => tasks.filter((task) => task.category === category);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) {
      console.log("No valid drop target found");
      return;
    }

    const activeIndex = tasks.findIndex((item) => item._id === active.id);
    const overIndex = tasks.findIndex((item) => item._id === over.id);

    if (active.id !== over.id) {
      const newCategory = over.data.current?.sortable?.containerId;

      console.log("Active ID:", active.id);
      console.log("Over ID:", over.id);
      console.log("New Category:", newCategory);

      if (newCategory) {
        const updatedTask = { ...tasks[activeIndex], category: newCategory };

        const updatedItems = arrayMove(tasks, activeIndex, overIndex).map((item) =>
          item._id === active.id ? updatedTask : item
        );

        setTasks(updatedItems);

        try {
          // PUT request to update task position in the database
          await axiosPublic.put(`api/tasks/${active.id}`, updatedTask);
        } catch (error) {
          console.log("Error updating task position:", error);
        }
      } else {
        console.log("New category not found");
      }
    }
  };

  return (
    <>
      <div className="bg-[#F5F3F1] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="md:flex items-center px-4 md:px-0 gap-5 justify-between py-8">
            <div className="md:w-2/3 flex gap-2">
              <input type="text" disabled placeholder="Search" className="input input-bordered w-full" />
              <div>
                <button type="button" onClick={handleTask} className="w-28 text-black btn btn-white">
                  <IoMdAdd />
                  Add Task
                </button>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <button className="btn btn-white text-black" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:justify-between">
              {categories.map((category, i) => (
                <div key={i} className="flex w-full flex-col md:w-1/3 gap-4" id={category}>
                  <h2 className="font-bold decoration-2 text-center">{category}</h2>
                  <SortableContext id={category} items={categorizedTasks(category)} strategy={verticalListSortingStrategy}>
                    {categorizedTasks(category).map((task) => (
                      <TaskItem key={task._id} task={task} />
                    ))}
                  </SortableContext>
                </div>
              ))}
            </div>
          </DndContext>
        </div>
      </div>
      <Modal refetch={refetch} />
    </>
  );
}
