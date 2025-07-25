import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInApi } from "../../services/api";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      const userData = await signInApi({ username, password });

      localStorage.setItem("username", userData.username);
      navigate("/tasks");
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="w-full max-w-md shadow-xl bg-base-100 rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">
          Welcome Back
        </h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input input-bordered w-full"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
        </form>

        <div className="text-sm text-center text-gray-500 space-y-2">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="link">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
