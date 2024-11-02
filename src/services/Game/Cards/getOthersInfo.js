//game_id=int&player_id=int
import { useEffect, useState, useCallback } from "react";
import { GET_PLAYERS_INFO } from "../../../utils/Constants";

function getOthersInfo (gameId, playerId) {
    
    const mock = [

        {
            nombre: "Player1", 
            fig_cards: [
                {id: 1, fig: 4, blocked: true},
                {id: 2, fig: 5, blocked: false},
                {id: 3, fig: 6, blocked: false},
            ], 
            mov_cant: 1
        },
        {
            nombre: "Player2", 
            fig_cards: [
                {id: 4, fig: 7, blocked: false},
                {id: 5, fig: 8, blocked: false},
                {id: 6, fig: 9, blocked: false},
            ], 
            mov_cant: 3
        }
    ];

    const [infoPlayers, setInfoPlayers] = useState([]);
    const url = `${GET_PLAYERS_INFO}game_id=${gameId}&player_id=${playerId}`;
    
    const fetchInfoPlayers = useCallback (async () => {
        try{
            // const response = await fetch(url, { method: "GET" });
            // if (!response.ok) {
            //     console.log("Error en la petición");
            // }
            // const data = await response.json();
            setInfoPlayers(mock);

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