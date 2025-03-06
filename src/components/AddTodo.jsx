import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { CiCalendar } from "react-icons/ci";
import { LuRepeat } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";

const AddToDo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    dispatch(addTodo( todo ));

    setTodo(""); // Clear input
  };

  return (
    <div
      className={`p-4 rounded-md shadow-md mb-6 transition ${
        theme === "dark"
          ? "bg-[#1E1E1E] text-white"
          : "bg-gradient-to-t from-[#3579371A] to-[#D0FFD21A] text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Add A Todo</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Write your task here"
          className={`w-full p-2 border rounded-md focus:outline-none transition ${
            theme === "dark"
              ? "bg-[#2C2C2C] text-white border-gray-600 focus:border-[#55a44e]"
              : "bg-white text-black border-gray-300 focus:border-[#357937]"
          }`}
        />
        <div className="flex justify-between items-center px-8">
          <div
            className={`flex text-2xl gap-6 transition ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <IoMdNotificationsOutline className="cursor-pointer hover:text-[#357937]" />
            <LuRepeat className="cursor-pointer hover:text-[#357937]" />
            <CiCalendar className="cursor-pointer hover:text-[#357937]" />
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-md transition ${
              theme === "dark"
                ? "bg-[#55a44e] text-black hover:bg-[#3c7b37]"
                : "bg-[#357937] text-white hover:bg-[#285928]"
            }`}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToDo;
