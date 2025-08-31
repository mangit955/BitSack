import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button2 from "../components/ui/Buttton2";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bg4 from "../assets/bg4.jpg";
import profileImg from "../assets/profile.png";
import barGraph from "../assets/bargraph.png";
import lineGraph from "../assets/line.png";
import googleIcon from "../assets/google.svg";

const testimonials = [
  {
    id: 1,
    quote:
      "“Basement is surprisingly handy for keeping all my business stuff in one place.”",
    name: "David Miller",
    role: "E-commerce Specialist",
    stat: "+21,35%",
    statLabel: "growth last month",
    image: profileImg,
  },
  {
    id: 2,
    title: "GROWTH",
    percentage: "+21,35%",
    desc: "This significant increase in growth highlights the effectiveness of our recent strategies and content approach.",
    chart: barGraph,
  },
  {
    id: 3,
    title: "ENGAGEMENT",
    percentage: "+78,12%",
    desc: "This increase in engagement rate highlights the effectiveness of our recent strategies and content approach.",
    chart: lineGraph,
  },
];

export default function Signup() {
  const cardHeight = 280;
  const visibleCards = 2;
  const containerHeight = cardHeight * visibleCards;
  const controls = useAnimation();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loopedList = [...testimonials, ...testimonials, ...testimonials];

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(""); // reset error

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/signup`,
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/signin");
    } catch (error) {
      console.error(error);
      setErrorMessage("Signup failed. Please try again.");
    }
  }

  useEffect(() => {
    const totalHeight = testimonials.length * cardHeight;

    const loopScroll = async () => {
      let position = 0;

      while (true) {
        position -= cardHeight;
        await controls.start({
          y: position,
          transition: { duration: 0.6, ease: "easeInOut" },
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (Math.abs(position) >= totalHeight * 2) {
          position = 0;
          await controls.set({ y: 0 });
        }
      }
    };

    loopScroll();
  }, [controls, cardHeight]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eeeff1] p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left - Signup Form */}
        <div className="md:w-1/2 flex flex-col justify-center items-center px-10 py-12">
          <div className="max-w-sm w-full">
            <h1 className="text-3xl font-bold mb-2">
              Keep your online links organized
            </h1>
            <p className="text-gray-500 mb-6">
              Sign up to start your 30 days free trial
            </p>

            {/* Google Sign In (disabled for now) */}
            <button
              className="w-full border rounded-lg py-2 mb-4 flex items-center justify-center gap-2 text-gray-400 cursor-not-allowed"
              title="Google sign in (coming soon)"
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

            <form className="space-y-4" onSubmit={signup}>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  ref={nameRef}
                  aria-label="Full Name"
                  required
                  placeholder="John Doe"
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  ref={emailRef}
                  aria-label="Email Address"
                  required
                  placeholder="john@gmail.com"
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    aria-label="Password"
                    required
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-black pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Inline Error Message */}
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <Button2 type="submit">Create Account</Button2>
            </form>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-black font-medium">
                Login Here
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Smooth Infinite Carousel (Hidden on Mobile) */}
        <div className="relative hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src={bg4}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div
            className="relative overflow-hidden"
            style={{ height: `${containerHeight}px` }}
          >
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#eeeff1] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#eeeff1] to-transparent z-10" />

            <motion.div
              animate={controls}
              className="flex flex-col items-center"
            >
              {loopedList.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-lg w-80 mb-6 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
                >
                  {t.quote ? (
                    <>
                      <p className="text-2xl opacity-90 font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        {t.quote}
                      </p>
                      <div className="flex items-center mt-4">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold">{t.name}</p>
                          <p className="text-sm text-gray-500">{t.role}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-2xl font-bold">{t.stat}</h3>
                        <p className="text-sm text-gray-600">{t.statLabel}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-medium text-gray-600">
                        {t.title}
                      </h3>
                      <p className="text-3xl font-bold mt-2">
                        {t.percentage}{" "}
                        <span className="text-sm font-normal text-gray-500">
                          last month
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm mt-2">{t.desc}</p>
                      <div className="mt-4 w-full h-40 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                        <img
                          src={t.chart}
                          alt={t.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
