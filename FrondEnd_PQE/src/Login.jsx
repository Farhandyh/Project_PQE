import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackgroundImage from "./components/login/BackgroundImage"; // Import BackgroundImage

const Login = () => {
  console.log("Login component rendered");
  const navigate = useNavigate(); // Tambahkan useNavigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Logika autentikasi sederhana (bisa diganti dengan pengecekan sebenarnya)
    if (username === "admin" && password === "admin") {
      // Pindah ke halaman dashboard
      navigate("/dashboard");
    } else {
      alert("Username atau Password salah!");
    }
  };

  return (
    <div className="flex h-screen">
      <div 
      className="w-full bg-white h-full flex"
      >
        <div
          className="w-7/12 bg-red-E01414 h-full shadow-custom-dark flex p-5"
          style={{ clipPath: "polygon(95% 0, 0 0, 0 100%, 70% 100%)" }}
        >
          <div className="text-white font-extrabold font-sans">O</div>
          <h1 className="text-white font-sans font-medium ml-2 max-w-md">Ensure quality optimize energy, maintain your battery performance with AHM</h1>
        </div>
        <div className="relative">
          <div className="bg-slate-300 border-slate-400 rounded-md p-8 backdrop-filter backdrop-blur-sm bg-opacity-0 mt-48 ml-20 ">
            <h1 className="text-red-E01414 text-3xl mb-20 ml-2 font-bold font-sans">Astra Honda Motor</h1>
            <form action="">
              <h1 className="text-4xl text-white font-bold text-center mb-6"></h1>
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-72 py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-E01414 peer"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state
                />
                <label className="absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-red-E01414 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                  Username
                </label>
                <BiUser className="absolute top-4 right-4 text-black" />
              </div>

              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-72 py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-E01414 peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state
                />
                <label className="absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-red-E01414 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                  Password
                </label>
                <AiOutlineLock className="absolute top-4 right-4  text-black" />
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
                onClick={handleLogin}
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
