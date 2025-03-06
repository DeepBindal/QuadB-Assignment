import { IoAddOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { FaMap } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { toggleSidebar } from "../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  const sidebar = useSelector((state) => state.auth.sidebar);
  const todos = useSelector((state) => state.todo.todos);

  const completedTasks = todos.filter((todo) => todo.isDone).length;
  const remainingTasks = todos.filter((todo) => !todo.isDone).length;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Remaining", value: remainingTasks },
  ];

  const COLORS = ["#142E15", "#3F9142"];

  return (
    <>
      {/* Overlay for small screens */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-opacity-50 md:hidden z-40"
          onClick={() => dispatch(toggleSidebar())} // ✅ FIXED: Function only runs on click
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-full transition-all duration-300 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } w-64 md:w-64 fixed md:static top-0 left-0 md:translate-x-0 z-50 md:z-auto overflow-hidden ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-white"
            : "bg-[#EEF6EF] text-black"
        } flex flex-col px-4 py-6`}
      >
        {/* User Info */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
            alt="User Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
          <h1 className="text-lg font-bold mt-2 text-green-600">Deep Bindal</h1>
        </div>

        {/* Navigation Links */}
        <ul className="text-sm space-y-2">
          {[
            { name: "All Tasks", icon: <CiViewList /> },
            { name: "Today", icon: <MdOutlineCalendarToday /> },
            { name: "Important", icon: <FaRegStar /> },
            { name: "Planned", icon: <FaMap /> },
            { name: "Assigned to me", icon: <MdOutlineAssignmentInd /> },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-green-100 hover:text-green-700 cursor-pointer transition-all"
            >
              <span className="text-lg">{item.icon}</span> {item.name}
            </li>
          ))}
        </ul>

        {/* Task Progress Section */}
        <div className="mt-10">
          <h2 className="text-base font-semibold mb-4">Task Progress</h2>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

