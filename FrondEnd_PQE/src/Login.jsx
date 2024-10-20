import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="relative">
      <div className="bg-slate-300 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
        <form action="">
          <h1 className="text-4xl text-white font-bold text-center mb-6"></h1>
          <div className="relative my-4">
            <input
              type="text"
              className="block w-72 py-2.5 px-0 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-red-E01414 peer"
              placeholder=""
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
              placeholder=""
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
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-red-CF0920 text-white py-2 hover:bg-red-500 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
