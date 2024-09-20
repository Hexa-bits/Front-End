import Button from "../../../../components/Button/Button";
import Start from "../setgame/setgame";
import { useNavigate } from "react-router-dom";
import React from "react";

function Home() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
  };
  const handleStartGame = () => {
    navigate("/create-config");
  };

  return (
    <div>
      <h1>Home</h1>
      <Button label="Logout" onClick={handleLogOut} />
      <Start />
    </div>
  );
}

export default Home;
