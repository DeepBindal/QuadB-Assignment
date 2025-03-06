import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const theme = useSelector((state) => state.auth.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
    navigate("/");
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center mx-4 transition-all ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <section
        className={`rounded-md p-6 shadow-lg max-w-md w-full transition-all ${
          theme === "dark" ? "bg-darkSecondary text-light" : "bg-lightSecondary text-dark"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center">
              Sign In
            </h2>
            <form className="mt-6" onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                    className="block w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring focus:ring-primary"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      className="block w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary px-4 py-2 text-white font-semibold transition hover:bg-primaryDark"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
