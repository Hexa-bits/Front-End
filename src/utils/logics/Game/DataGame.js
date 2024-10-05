import { useState, useEffect } from 'react';
import getTurnPlayer from '../../../hooks/Game/getTurnPlayer.js';

const DataGame = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const gameId = localStorage.getItem('game_id');
  const pollingInterval = 2000;

  const fetchData = async () => {
    try {
      // Obtener jugador actual
      const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
      
      if (newPlayerId !== playerId) {
        setCurrentPlayer(newNamePlayer);
        setPlayerId(newPlayerId);
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

  return {currentPlayer, playerId };
};

export default DataGame;
