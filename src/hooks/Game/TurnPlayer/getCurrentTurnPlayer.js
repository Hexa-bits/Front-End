import { useState, useEffect } from 'react';
import getTurnPlayer from './getTurnPlayer.js';
import { useNameTurnPlayerUrl_WS } from '../../../utils/logics/Game/useTurnPlayerUrls.js';

function getCurrentTurnPlayer() {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [isConnectWS, setisConnectWS] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const gameId = localStorage.getItem('game_id');
    const fullUrl = useNameTurnPlayerUrl_WS(gameId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
                setCurrentPlayer(newNamePlayer);
                setPlayerId(newPlayerId);
                setisConnectWS(true);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };
        fetchData();
    }, [gameId]);

    useEffect(() => {
        if (!isConnectWS) {return;}

        console.log('Connecting to WebSocket:');
        const websocket = new WebSocket(fullUrl);

        websocket.onmessage = (event) => {
            const message = event.data;
            if (message && message.startsWith('{')) {
                try {
                    const data = JSON.parse(message);
                    setCurrentPlayer(data.name_player);
                    setPlayerId(data.id_player);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            }
        };

        return () => {
                websocket.close();
        };    
    }, [isConnectWS]);

    return { currentPlayer, playerId };
}

export default getCurrentTurnPlayer;
