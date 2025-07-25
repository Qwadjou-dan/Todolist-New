import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../services/api";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Log user input (for debugging)
    console.log("Sign Up Info:", {
      fullname,
      email,
      username,
      password,
    });

    try {
      await signUpApi({ fullname, username, email, password });
      alert("Sign up successful");

      //Redirect to home and pass username
      navigate("/", {
        state: {
          username,
        },
      });
    } catch (error) {
      alert("Sign up failed: " + error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="w-full max-w-md shadow-xl bg-base-100 rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">
          Create Account
        </h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>

        <div className="text-sm text-center text-gray-500 space-y-2">
          <p>
            Already have an account?{" "}
            <a href="/" className="text-primary hover:underline">
              Log in
            </a>
          </p>
          <p>
            By signing up, you agree to our{" "}
            <a href="/terms" className="link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="link">
              Privacy Policy
            </a>
            .
          </p>
          <p>
            Need help?{" "}
            <a href="/support" className="link">
              Contact Support
            </a>
          </p>
          <p>
            Follow us on{" "}
            <a href="/social" className="link">
              Social Media
            </a>
          </p>
          <p>© 2023 Your Company. All rights reserved.</p>
          <p>Version 1.0.0 | Last updated: October 2023</p>
          <p>
            Learn more{" "}
            <a href="/about" className="link">
              About Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
