// eslint-disable-next-line react/prop-types
function BackgroundImage({ children, height = "100vh", width = "88%" }) {
  return (
    <div
      className="text-white flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url(../src/assets/dashboardLogin.png)",
        backgroundSize: `${width} ${height}`,
        backgroundRepeat: "no-repeat",
        height: height,
      }}
    >
      {children}
    </div>
  );
}

export default BackgroundImage;
