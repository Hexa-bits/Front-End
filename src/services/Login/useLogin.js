
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { useReg } from './useReg.js';
import { HOME, LoginHelpText } from '../../utils/Constants.js';

export const useLogin = () => {
    localStorage.clear();
    sessionStorage.clear();

    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');    
    
    const handleChange = (e) => { 
        setPlayerName(e.target.value); 
    };

    const checkInput = (input) => { return input.length > 0 && input.length <= 10; }

    const handleInput = () => {
        if (checkInput(playerName)) {
            try { 
                useReg({ playerName });
                navigate(HOME);
            }
            catch (error) { alert("Error al crear usuario. " + error.message); }
        } else { alert("Nombre " + LoginHelpText);}
    };

    return { playerName, handleChange, handleInput };
};
