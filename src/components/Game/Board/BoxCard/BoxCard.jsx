import './BoxCard.css';
import { COLORMAP_BOXCARDS } from '../../../../utils/Constants';


function BoxCard({ color, isSelected, isHighlighted, highlightColor, onClick }) {
    const mappedColor = COLORMAP_BOXCARDS[color] || 'gray';
    
    // Determina las clases a aplicar
    const boxClass = `BoxCard ${isSelected ? "selected" : ""} ${isHighlighted ? "highlighted" : ""}`;
    
    // Define el estilo para el color de fondo
    let boxStyle = {
        backgroundColor: mappedColor,
    };

    if (isHighlighted) {
        boxStyle = {
            ...boxStyle,
            boxShadow: `0 0 10px ${highlightColor}, 0 0 10px ${highlightColor}`
        };
    } else if (isSelected) {
        boxStyle = {
            ...boxStyle,
            border: '2px solid var(--boxCardsSelecc)',
            boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.8)',
        };
    }

    return (
        <div
            role="button"
            className={boxClass}
            onClick={onClick}
            style={boxStyle}
        >
        </div>
    );
}


export default BoxCard;
