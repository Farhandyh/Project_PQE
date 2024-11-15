import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  console.log("Login component rendered");
  const navigate = useNavigate(); // Tambahkan useNavigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Data login dalam format JSON
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json(); // Mendapatkan data JSON dari response
      console.log("Login successful:", data);
  
      // Cek role dan navigasi ke halaman yang sesuai
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
    <div className="flex h-screen">
      <div className="w-full bg-white h-full flex">
        <div
          className="w-6/12 bg-red-E01414 h-full shadow-custom-dark flex p-5"
          style={{ clipPath: "polygon(95% 0, 0 0, 0 100%, 70% 100%)" }}
        >
          <div className="text-white font-extrabold font-sans">O</div>
          <h1 className="text-white font-sans font-medium ml-2 max-w-md">
            Ensure quality optimize energy, maintain your battery performance with AHM
          </h1>
        </div>
        
        {/* Logo 3D akan disembunyikan pada layar kecil */}
        <img
          src="src/assets/picture3D/LogoBatteryLogin3D.png"
          alt="logo"
          className="absolute left-1/4 ml-64 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-auto z-20 hidden md:block" // Sembunyikan pada layar kecil
        />

        <div className="relative w-full md:w-5/12 lg:w-4/12 xl:w-3/12 mt-20 mx-auto"> {/* Sesuaikan lebar form */}
          <div className="bg-slate-300 border-slate-400 rounded-md p-8 backdrop-filter backdrop-blur-sm bg-opacity-0">
            <img
              src="/Honda_Logo.png"
              alt="logo"
              className="ml-7 w-56 h-auto mb-3 hidden md:flex"
            />
            <h1 className="text-red-E01414 text-3xl ml-2 font-bold font-sans">Astra Honda Motor</h1>
            <hr className="w-32 border-red-E01414 border-t-2 mx-auto mb-14" />
            <form onSubmit={handleLogin}>
              <h1 className="text-4xl text-white font-bold text-center mb-6"></h1>
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-full py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-E01414 peer"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state
                  placeholder=" "
                />
                <label className="absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-red-E01414 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                  Username
                </label>
                <BiUser className="absolute top-4 right-4 text-black" />
              </div>

              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-full py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-E01414 peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state
                  placeholder=" "
                />
                <label className="absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-red-E01414 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
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
