// import { CONFIG_URL } from "../utils/Constants";

// const id_user = localStorage.getItem("id_usser");

// async function create() {
//   try {
//     const response = await fetch(CONFIG_URL, {
//       method: "POST", //esta función responde al async de handleclick
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id_user, game_name, max_players }), //creo que acá debería mandar tambien el id del owner
//     });

//     if (!response.ok) {
//       throw new Error("Error al enviar solicitud 'crear partida'. ");
//     }

//     const data = await response.json(); //va a hacer que espere a que el back devuelva algo (el id) y ahí le va a asignar la data al id de la partida
//     const { game_id } = data.id;

//     alert(`Partida ${game_name} creada exitosamente con Id: ${data.id}`);

//     localStorage.setItem("game_name", game_name); //guardo en el local storage el nombre e id de la partida
//     localStorage.setItem("game_id", game_id);
//     localStorage.setItem("max_players", max_players);

//     navigate("/game/join"); //DEBERIA NAVEGAR AL GAME
//   } catch (error) {
//     alert("Error al crear partida. " + error.message);
//   }
// }
// export { create };
