import { GET_TIMER_LEFT } from "../../utils/Constants";

export const getTimer = async (gameId) => {
    try {
        const response = await fetch(GET_TIMER_LEFT + gameId, { method: 'GET' });

        if (!response.ok) {
            console.error('Error fetching timer data:', response);
        }
        const data = await response.json();
        return data.left_time;
    }
    catch (error) {
        console.log('Error fetching timer data:', error);
    }
    return null;
}
