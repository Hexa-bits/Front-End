import { HIGHLIGHT_FIGS } from '../../../../utils/Constants';

function getFormedFig(game_id) {
    const [formedFig, setFormedFigs] = useState([]);

    useEffect(() => {
        async function fetchFormedFig() {
            try {
                const response = await fetch(HIGHLIGHT_FIGS + game_id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor.");
                }
                const data = await response.json();
                console.log("Highlighted boxcards: ", data);
                setFormedFigs(data);
            } catch (error) {
                console.error("Error when obtaining highlighted boxcards:", error);
            }
        }

        if (game_id) {
            fetchFormedFig();
        }
    }, [game_id]);
  
    return { formedFig };
}

export default getFormedFig;