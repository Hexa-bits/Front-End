// import fetchMock from "fetch-mock";
// const fullUrl = "http://localhost:8000/home/lobby?game_id=3";
// fetchMock.get(fullUrl, {
//     game_name: "PEPE",
//     max_players: 3,
//     name_players: [
//         { username: "player1" },
//         { username: "player2" },
//         { username: "player3" }
//     ]
// });

export async function fetchGameInfo(fullUrl) {
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Error al obtener información del juego.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}