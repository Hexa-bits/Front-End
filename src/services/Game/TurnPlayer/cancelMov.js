import { CANCEL_MOV_URL } from "../../../utils/Constants.js";

const cancelMovCard = async (player_id, game_id) => {

  try {
    const response = await fetch(CANCEL_MOV_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id,
        game_id,
      }),
    });

    if (response.status === 404 || response.status === 400) {
      return false;
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      console.log("mov descartado con éxito");
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export default cancelMovCard;
