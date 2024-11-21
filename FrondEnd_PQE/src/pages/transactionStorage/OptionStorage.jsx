import Header from '../../components/materialCRUD/Header';
import { Link } from "react-router-dom";

const OptionStorage = () => {
    return (
        <>
            <div className="flex items-center justify-center h-3/4 bg-gray-100">
                <div className="flex flex-col items-center justify-center bg-red-E01414 rounded-lg w-80 h-auto pb-5 shadow-lg">
                    <Header />
                    <Link
                    to="/dashboard/storage-checkIn" // Ganti dengan route yang sesuai
                    className="block w-3/4 bg-white text-red-600 font-semibold text-center py-3 my-4 mt-6 rounded-lg hover:bg-red-100 transition duration-200"
                    >
                    CheckIn
                    </Link>
                    <a
                    href=""
                    className="block w-3/4 bg-white text-red-600 font-semibold text-center py-3 my-4 rounded-lg hover:bg-red-100 transition duration-200"
                    >
                    CheckOut
                    </a>
                    <a
                    href=""
                    className="block w-3/4 bg-white text-red-600 font-semibold text-center py-3 my-4 rounded-lg hover:bg-red-100 transition duration-200"
                    >
                    History
                    </a>
                </div>
            </div>
        </>
    )
}

export default OptionStorage;