import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  console.log("Login component rendered");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      if (data.role === "2") {
        navigate("/dashboard");
      } else {
        navigate("/monitor");
      }
    } catch (error) {
      console.error("Error saat login:", error.message);
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full bg-white h-full flex flex-grow sm:bg-white sm:h-auto">
        {/* Sidebar for larger screens */}
        <div
          className="w-6/12 bg-red-E01414 h-full shadow-custom-dark flex p-5 hidden sm:flex"
          style={{ clipPath: "polygon(95% 0, 0 0, 0 100%, 70% 100%)" }}
        >
          <div className="text-white font-extrabold font-sans">O</div>
          <h1 className="text-white font-sans font-medium ml-2 max-w-md">
            Ensure quality optimize energy, maintain your battery performance
            with AHM
          </h1>
        </div>

        {/* Logo Image for larger screens */}
        <img
          src="src/assets/picture3D/LogoBatteryLogin3D.png"
          alt="logo"
          className="absolute left-1/4 ml-60 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-auto z-20 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 2xl:w-1/3 md:ml-36 lg:ml-52 xl:ml-56 2xl:ml-64 hidden md:block"
        />

        {/* Form Container */}
        <div className="relative w-full md:w-5/12 lg:w-4/12 xl:w-3/12 mt-24 mx-auto">
          <div className="bg-slate-300 border-slate-400 rounded-md p-8 backdrop-filter backdrop-blur-sm bg-opacity-0">
            {/* Honda Logo */}
            <img
              src="/Honda_Logo.png"
              alt="logo"
              className="w-56 h-auto mx-auto hidden md:flex"
            />
            <h1 className="text-red-600 text-3xl mt-5 font-bold font-sans text-center">
              Astra Honda Motor
            </h1>
            <hr className="w-32 border-red-600 border-t-2 mx-auto mb-14" />

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-full py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                />
                <label className="absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-red-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                  Username
                </label>
                <BiUser className="absolute top-4 right-4 text-black" />
              </div>

              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-full py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                />
                <label className="absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-red-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                  Password
                </label>
                <AiOutlineLock className="absolute top-4 right-4 text-black" />
              </div>

              <div className="flex justify-between items-center ">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" id="rememberMe" className="mr-2" />
                  <label htmlFor="rememberMe" className="text-gray-700">
                    Remember Me
                  </label>
                </div>
                <Link to="" className="text-sm text-blue-600 cursor-pointer">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-red-CF0920 text-white py-2 hover:bg-red-500 transition-colors duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
