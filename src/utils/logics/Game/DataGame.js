import { useState, useEffect } from 'react';
import getMovements from '../../../hooks/Game/getMovements.js';
import getFigureCards from '../../../hooks/Game/getFigureCards.js';
import getTurnPlayer from '../../../hooks/Game/getTurnPlayer.js';

const DataGame = () => {
  const [movsIds, setMovsIds] = useState([]);
  const [figsIds, setFigsIds] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const gameId = localStorage.getItem('game_id');
  const pollingInterval = 1000; // 5 segundos

  const fetchData = async () => {
    try {
      // Obtener jugador actual
      const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
      
      if (newPlayerId !== playerId) {
        setCurrentPlayer(newNamePlayer);
        setPlayerId(newPlayerId);

        // Obtener movimientos
        const { movs_ids } = await getMovements();
        setMovsIds(movs_ids);

        // Obtener figuras
        const { figs_ids } = await getFigureCards();
        setFigsIds(figs_ids);
      }
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  // Polling para datos del juego
  useEffect(() => {
    fetchData(); // Llamada inicial

    const interval = setInterval(() => {
      fetchData();
    }, pollingInterval);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [playerId]);

  return { movsIds, figsIds, currentPlayer, playerId };
};

export default DataGame;
