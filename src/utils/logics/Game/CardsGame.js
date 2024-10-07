//todo esto se borra
import getMovements from "../../../hooks/Game/Cards/getMovements.js";
import getFigureCards from "../../../hooks/Game/Cards/getFigureCards.js";
import getTurnPlayer from "../../../hooks/Game/TurnPlayer/getTurnPlayer.js";
import { useState, useEffect } from "react";

const CardsGame = () => {
  const [movsIds, setMovsIds] = useState([]);
  const [figsIds, setFigsIds] = useState([]);
  const playerId = parseInt(localStorage.getItem("id_user"), 10);
  const gameId = localStorage.getItem("game_id");
  //const pollingInterval = 2000;

  const fetchData = async () => {
    try {
      const { playerId: newPlayerId, namePlayer: newNamePlayer } =
        await getTurnPlayer(gameId);
      // Obtener movimientos
      const { movs_ids } = await getMovements();
      setMovsIds(movs_ids);

      // Obtener figuras
      const { figs_ids } = await getFigureCards();
      setFigsIds(figs_ids);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llamada inicial
  }, [playerId]);

  return { movsIds, figsIds };
};

export default CardsGame;
