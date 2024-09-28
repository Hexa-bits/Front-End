
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { useReg } from './useReg.js';
import { checkInput } from './loginHelper.js'; 
import { HOME, LoginHelpText } from '../../utils/Constants.js';

export const useLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');  

    useEffect(() => {
        const savedUserName = localStorage.getItem('username');
        if (savedUserName) {
            setUsername(savedUserName);
        }
    }, []);    
    
    const handleChange = (e) => { 
        setUsername(e.target.value); 
    };

    const handleInput = () => {
        if (checkInput(username)) {
            const savedUserName = localStorage.getItem('username');
            if (username !== savedUserName) {                    
                try { 
                    useReg({ username });
                    navigate(HOME);
                }
                catch (error) { alert("Error al crear usuario. " + error.message); }
            } else { navigate(HOME); }
        
        } else { alert("Nombre " + LoginHelpText);}
    };

    return { username, handleChange, handleInput };
};
