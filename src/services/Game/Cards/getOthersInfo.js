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
                console.log("Error en la petición");
            }
            const data = await response.json();
            setInfoPlayers(data);

        } catch (error) {
            console.log(error);
        }
    }, [playerId] );

    useEffect(() => {
        fetchInfoPlayers();
    }, [fetchInfoPlayers]);

    return {infoPlayers, fetchInfoPlayers};
};

export default getOthersInfo;