function Image3D({ height, width }) {
  return (
    <div
      className="text-white flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(../src/assets/picture3D/human3D.png)`,
        backgroundSize: `${width} ${height}`,
        backgroundRepeat: "no-repeat",
        height: height,
      }}
    ></div>
  );
}

export default Image3D;
