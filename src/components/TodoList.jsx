import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { markDone, markImportant } from "../features/todo/todoSlice";
import { FaRegStar, FaStar } from "react-icons/fa";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) =>
    [...state.todo.todos].sort((a, b) => b.id - a.id)
  );
  const theme = useSelector((state) => state.auth.theme);

  return (
    <div
      className={`p-4 rounded-md shadow-md mb-6 ${
        theme === "dark" ? "bg-[#2C2C2C] text-white" : "bg-[#FBFDFC] text-black"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">To-Do</h2>
      <ul className="flex flex-col gap-3">
        {todos
          ?.filter((todo) => !todo.isDone)
          .map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-t-3 border-secondary py-4"
            >
              {/* Task Item */}
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => dispatch(markDone(todo.id))}
                  className="cursor-pointer w-5 h-5 accent-green-600"
                />

                {/* Task Text */}
                <span
                  className={`text-lg ${
                    todo.isImportant ? "font-semibold text-green-600" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              {/* Important Toggle */}
              <button
                onClick={() => dispatch(markImportant(todo.id))}
                className={`text-lg transition-colors ${
                  todo.isImportant ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {todo.isImportant ? (
                  <FaStar className="text-2xl" />
                ) : (
                  <FaRegStar className="text-2xl" />
                )}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
