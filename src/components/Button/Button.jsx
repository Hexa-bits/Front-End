import React from 'react';
import './Button.css';

//Botón con funcionalidad al hacer click
function Button ({label, onClick, disabled, className}){
    return(
        <button
            className={`btn btn-primary ${className} ${disabled ? 'disabled btn-ight': ''}`}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button;