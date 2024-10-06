import { useNameTurnPlayerUrl_WS } from '../../hooks/Game/useTurnPlayerUrl.js';
import { useState, useEffect } from 'react';
import getTurnPlayer from '../../../hooks/Game/getTurnPlayer.js';

function getCurrentTurnPlayer() {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const gameId = localStorage.getItem('game_id');

  const fullUrl = useNameTurnPlayerUrl_WS(gameId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
        setCurrentPlayer(newNamePlayer);
        setPlayerId(newPlayerId);
        setIsWsConnected(true); // Indicar que podemos conectar el WebSocket
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };
    fetchData();
  }, [gameId]);

  useEffect(() => {
    if (!isWsConnected) return;

    const ws = new WebSocket(fullUrl);

    ws.onmessage = (event) => {
      const message = event.data;
      try {
        const { playerId: newPlayerId, namePlayer: newNamePlayer } = JSON.parse(message);
        setCurrentPlayer(newNamePlayer);
        setPlayerId(newPlayerId);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [isWsConnected, gameId]);


  const refreshPlayer = async () => {
    try {
      const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
      setCurrentPlayer(newNamePlayer);
      setPlayerId(newPlayerId);
    } catch (error) {
      console.error('Error refreshing player data:', error);
    }
  };

  return { currentPlayer, playerId, refreshPlayer };
}

export default getCurrentTurnPlayer;
