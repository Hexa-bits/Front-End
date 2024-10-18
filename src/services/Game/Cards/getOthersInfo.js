//game_id=int&player_id=int
import { useEffect, useState, useCallback } from "react";
import { GET_PLAYERS_INFO } from "../../../utils/Constants";

function getOthersInfo (gameId, playerId) {
    
    const [infoPlayers, setInfoPlayers] = useState([]);
    const url = `${GET_PLAYERS_INFO}game_id=${gameId}&player_id=${playerId}`;
    
    const fetchInfoPlayers = useCallback (async () => {
        try{
            const response = await fetch(url, { method: "GET" });
            if (!response.ok) {
                throw new Error("Error al obtener la información de los otros jugadores.");
            }
            const data = await response.json();
            setInfoPlayers(data);
            
            // console.log(
            //     "Información de los otros jugadores: ", 
            //     data.map((player) => 
            //         player.nombre, 
            //         player.fig_cards.map((card) => card.id),
            //         player.mov_cant,
            //     ),
            // );
        } catch (error) {
            console.error("Error al obtener la información de los otros jugadores:", error);
        }
    }, [playerId] );

    useEffect(() => {
        fetchInfoPlayers();
    }, [fetchInfoPlayers]);

    return {infoPlayers, fetchInfoPlayers};
};

export default getOthersInfo;