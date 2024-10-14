import { HIGHLIGHT_FIGS } from '../../../../utils/Constants';
import { useEffect, useState } from 'react';

function getFormedFig(game_id) {
    const [formedFig, setFormedFigs] = useState([]);

    useEffect(() => {
        async function fetchFormedFig() {
            if (!game_id) return; // Asegúrate de que game_id esté definido

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
            }
        }

        fetchFormedFig();

    }, [game_id]); 

    return formedFig; 
}


export default getFormedFig;