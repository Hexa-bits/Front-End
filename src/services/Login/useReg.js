import React from "react";
import { LOGIN_URL } from "../../utils/Constants";


export const useReg = async ( { playerName }) => {
    try {            
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username : playerName })  
        });
        
        if (!response.ok) {
            throw new Error("Error al enviar solicitud 'crear usuario'. ");
        }

        const data = await response.json();
        const Id = data.id;

        sessionStorage.setItem('player_name', playerName); 
        sessionStorage.setItem('player_id', Id);
        sessionStorage.setItem('orig_player_id', Id);
        
    } catch (error) {
        console.log(error);
    }
}

