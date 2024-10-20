import { Routes } from "react-router-dom";
import Login from "./Login";
import BackgroundImage from "./components/login/BackgroundImage";

function App() {
  return (
    <>
      <BackgroundImage height="100vh" width="100%">
        {/* // flex justify-center items-center h-full digunakan untuk memusatkan <Login />secara horizontal dan vertikal. 
            // h-full memastikan bahwa elemen div ini memenuhi tinggi layar sehingga posisi login tetap di tengah.*/}
        <div className="flex justify-center items-center h-full ml-[47vw]">
          {" "}
          <Login />
          <Routes path="login" element={<Login />}></Routes>
        </div>
      </BackgroundImage>
    </>
  );
}

export default App;
