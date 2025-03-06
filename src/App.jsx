import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const theme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const sidebar = useSelector((state) => state.auth.sidebar);

  return (
    <Router>
      <Navbar />
      <div
        className={`min-h-screen outfit-font flex transition-all duration-300 ${
          theme === "dark" ? "bg-dark text-white" : "bg-light text-black"
        }`}
      >
        {(isAuthenticated && sidebar) && (
          <div className="w-64 transition-all duration-300">
            <Sidebar />
          </div>
        )}
        <div className={`flex-1 p-4 transition-all duration-300`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-user" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
