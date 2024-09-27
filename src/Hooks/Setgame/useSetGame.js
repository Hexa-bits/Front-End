// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../utils/Constants.js";
// import { create } from "./useCreate.js";
// import { checkInput } from "./inputchecker.js";
// import { checkbuttons } from "./inputchecker.js";

// export const useGame = () => {
//   const [game_name, setGameName] = useState("");

//   const [max_players, SetPlayerAmnt] = useState(5); //siempre me da invalido

//   const handleonchange = (e) => {
//     setGameName(e.target.value);
//   };

//   const handleClick = async () => {
//     if (checkInput(game_name)) {
//       create();
//     } else {
//       if (!checkInput(game_name)) {
//         alert("error, el nombre debe tener entre 1 y 10 caracteres");
//       } else if (!checkbuttons(max_players)) {
//         alert("error, la cantidad de jugadores es invalida");
//       }
//     }
//   };

//   return { game_name, max_players, handleClick, handleonchange };
// };
