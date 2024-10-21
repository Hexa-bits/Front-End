import { HIGHLIGHT_FIGS } from '../../../../utils/Constants';
import { useCallback, useEffect, useState } from 'react';

function getFormedFig() {
    const game_id = localStorage.getItem('game_id');
    if (!game_id) return [];
    
    const [formedFigs, setFormedFigs] = useState([]);

    const fetchFormedFigs = useCallback (async () => {
        if (!game_id) return [];
        try {
            const response = await fetch(HIGHLIGHT_FIGS + game_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor.");
            }
            
            const data = await response.json();

            setFormedFigs(data); 

        } catch (error) {
            console.error("Error al obtener las cartas resaltadas:", error);
            return [];
        }
    }, [game_id])

    useEffect(()=>{
        fetchFormedFigs();
    },[game_id]);

    return { formedFigs, fetchFormedFigs }; 
}


export default getFormedFig;