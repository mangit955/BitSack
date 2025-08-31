import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Button2 from "../components/ui/Buttton2";
import googleIcon from "../assets/google.svg";
import { Eye, EyeOff } from "lucide-react";

export default function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/signin`,
        {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/dashboard"); // redirect after login
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eeeff1] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back </h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        {/* Google Sign In */}
        <button
          className="w-full border rounded-lg py-2 mb-4 flex items-center justify-center gap-2 bg-gray-100 text-gray-500 cursor-not-allowed"
          title="Google sign in coming soon"
          disabled
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Signin Form */}
        <form className="space-y-4" onSubmit={signin}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="jhon@gmail.com"
              aria-label="Email"
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                aria-label="Password"
                required
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-black pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <Button2 type="submit">Sign In</Button2>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
