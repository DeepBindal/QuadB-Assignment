import React from "react";
import { removeTodo } from "../features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const CompletedTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) =>
    [...state.todo.todos].sort((a, b) => b.id - a.id)
  );
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className="bg-transparent p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Completed</h2>
      <ul className="flex flex-col gap-3">
        {todos
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-transparent px-3 border-t-3 border-secondary py-4 "
            >
              <span className="line-through">{todo.text}</span>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CompletedTodos;
