import { AiOutlineCloseCircle } from "react-icons/ai";

const Header = () => {
    return(
        <div className="bg-white rounded-b-3xl w-72 h-11 flex justify-between items-center px-2 py-3 top-0">
            {/* Gambar di pojok kiri */}
            <img className="w-14 h-9" src="/Honda_Logo.png" alt="Honda Logo" />

            {/* Link dengan ikon di pojok kanan */}
            <a href="#" className="w-14 h-9 flex items-center text-red-E01414 justify-center">
                <AiOutlineCloseCircle className="text-3xl" />
            </a>
        </div>

    )
}
export default Header;