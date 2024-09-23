import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import React from "react";

function Home() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
  };

  const handleCrearPartida = () => {
    navigate("/home/create-config");
  };

  return (
    <div>
      <h1>Home</h1>
      <Button label="Logout" onClick={handleLogOut} />
      <h1></h1>
      <Button label="Crear Partida" onClick={handleCrearPartida} />
    </div>
  );
}

export default Home;
