import React, { useEffect, useState } from "react";
import AddToDo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import CompletedTodos from "../components/CompletedTodos";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FetchWeather from "../components/FetchWeather";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login-user");
    }
  }, [isAuthenticated]);
  const todoActions = [
    { action: "Weather" },
    { action: "News" },
    { action: "Sport" },
  ];
  return (
    <div>
      <AddToDo />
      <TodoList />
      <CompletedTodos />
      <div className="flex mt-5 flex-wrap items-center gap-4">
        <h1 className="text-2xl">Additional Actions</h1>
        {todoActions.map((action) => (
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-[#55a44e] w-full text-white font-semibold rounded-md hover:bg-secondary"
            >
              Check {action.action}
            </button>

            <FetchWeather
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
