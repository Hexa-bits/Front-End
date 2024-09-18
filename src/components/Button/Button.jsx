import './Button.css';

//Botón con funcionalidad al hacer click
function Button ({label, onClick}){
    return(
        <button
            type="button"
            className="btn btn-primary"
            onCLick={onClick}
        >
            {label}
        </button>
    )
}

export default Button;