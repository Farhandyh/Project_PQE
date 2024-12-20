import { AiOutlineCloseCircle } from "react-icons/ai";

const Header = () => {
    return (
      <div className="bg-white rounded-b-3xl rounded-t-lg w-full h-14 flex justify-between items-center px-2 py-3 shadow-xl">
        {/* Gambar di pojok kiri */}
        <img className="w-16 h-10" src="/Honda_Logo.png" alt="Honda Logo" />
      </div>
    );
}
export default Header;