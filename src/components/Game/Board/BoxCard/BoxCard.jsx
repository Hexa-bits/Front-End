import './BoxCard.css';
import { COLORMAP_BOXCARDS } from '../../../../utils/Constants';


function BoxCard({ color, isSelected, isHighlighted, highlightColor, onClick }) {  
    const mappedColor = COLORMAP_BOXCARDS[color] || 'gray'
    const boxStyle = {
        backgroundColor: mappedColor,
        border: isHighlighted ? `3px solid ${highlightColor}` : 'none', // Borde del color correspondiente
        boxShadow: isHighlighted ? `0 0 5px ${highlightColor}` : 'none', // Efecto de brillo
    };
    return (
        <div
            role="button"
            className={`BoxCard ${isSelected ? "selected" : ""} ${isHighlighted ? "highlighted" : ""}`}
            onClick={onClick}
            style={boxStyle}
        >
        </div>
    );
}

export default BoxCard;
