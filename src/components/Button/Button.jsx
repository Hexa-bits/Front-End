import './Button.css';

//Botón con funcionalidad al hacer click
function Button ({label, onClick, disabled}){
    return(
        <button
            
            className={`btn btn-primary ${disabled ? 'disabled btn-ight': ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button;