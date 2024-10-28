import Header from "../../components/materialCRUD/Header";
import TextField from "../../components/materialCRUD/TextField";

const CreateBattery = () => {
    return(
        <>
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-2xl w-72 h-1/4">
                <Header />
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-64 h-64 mt-6 mb-6">
                    <form action="" className="w-full ml-11 mb-2">
                        <label className="block text-black ml-2 mb-1 mt-3" htmlFor="id-battery">Id Battery</label>
                        <TextField id="id-battery" className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="battery-capacity">Battery Capacity</label>
                        <TextField id="battery-capacity" className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="battery-status">Battery Status</label>
                        <TextField id="battery-status" className="w-full mb-4" /><br />
                        <div className="rounded-b-3xl w-52 h-11 flex justify-between items-center px-2 py-3 mt-2">
                            <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                                Save
                            </button>
                            <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBattery;