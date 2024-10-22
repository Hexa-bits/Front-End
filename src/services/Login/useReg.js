import React from "react";
import { LOGIN_URL } from "../../utils/Constants";


export const useReg = async ( {username}) => {
    try {            
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })  
        });
        
        if (!response.ok) {
            throw new Error("Error al enviar solicitud 'crear usuario'. ");
        }

        const data = await response.json();
        const Id = data.id;

        localStorage.setItem('username', username); 
        localStorage.setItem('id_user', Id);

    } catch (error) {
        console.log(error);
    }
}

